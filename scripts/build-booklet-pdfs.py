#!/usr/bin/env python3
"""
Builds the info booklet PDFs into booklets/pdf/.

Prints /booklet/<audience>/print for each booklet from a running copy of the
site and saves it as US Letter. Rebuild after changing any booklet copy.

    npm run build && BOOKLET_SECRET=local npm start      # in one terminal (or `npm run dev`)
    BOOKLET_SECRET=local python3 scripts/build-booklet-pdfs.py [http://localhost:4848]

Needs: pip install playwright && python3 -m playwright install chromium
(or set CHROME_PATH to an installed Chrome).
"""
import base64, hashlib, hmac, json, os, secrets, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4848').rstrip('/')
SECRET = os.environ.get('BOOKLET_SECRET', 'dev-only-booklet-secret')
AUDIENCES = ['parents', 'students', 'founders', 'high-schools', 'universities']
OUT = Path(__file__).resolve().parent.parent / 'booklets' / 'pdf'

def b64(b: bytes) -> str:
    return base64.urlsafe_b64encode(b).decode().rstrip('=')

def token(audience: str) -> str:
    body = {'a': audience, 'n': 'Print', 'x': int((time.time() + 3600) * 1000), 'i': secrets.token_hex(4)}
    payload = b64(json.dumps(body, separators=(',', ':')).encode())
    sig = b64(hmac.new(SECRET.encode(), payload.encode(), hashlib.sha256).digest())
    return f'{payload}.{sig}'

def shrink(path: Path) -> None:
    """Re-encode large images as JPEG, at most 1800 px on the long side (about 200 dpi on the page)."""
    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError:
        return
    writer = PdfWriter(clone_from=PdfReader(str(path)))
    for pg in writer.pages:
        for img in pg.images:
            # Leave small images and anything with transparency alone.
            if len(img.data) < 150_000 or img.image.mode in ('RGBA', 'LA', 'P'):
                continue
            im = img.image.convert('RGB')
            im.thumbnail((1800, 1800))
            img.replace(im, quality=82)
    with open(path, 'wb') as f:
        writer.write(f)

OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    kw = {'executable_path': os.environ['CHROME_PATH']} if os.environ.get('CHROME_PATH') else {}
    browser = p.chromium.launch(**kw)
    page = browser.new_page(viewport={'width': 816, 'height': 1056})
    for a in AUDIENCES:
        page.goto(f'{BASE}/booklet/{a}/print?t={token(a)}', wait_until='load', timeout=120000)
        # Hide the Next.js dev overlay if printing from `next dev`.
        page.add_style_tag(content='nextjs-portal{display:none!important}')
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(1200)
        if page.locator('.bk-page').count() == 0:
            sys.exit(f'{a}: no pages rendered — is BOOKLET_SECRET the same as the server’s?')
        path = OUT / f'west-ventures-info-booklet-{a}.pdf'
        page.pdf(path=str(path), prefer_css_page_size=True, print_background=True)
        shrink(path)
        print(f'{path.relative_to(OUT.parent.parent)}  {path.stat().st_size // 1024} KB')
    browser.close()
