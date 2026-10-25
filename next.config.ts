import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 82 is used by the portfolio tile walls (copied from the ACU site).
    qualities: [75, 82],
  },
  async redirects() {
    // The portfolio wall moved to /ventures; company and student pages stay
    // under /portfolio/.
    return [
      { source: '/portfolio', destination: '/ventures', permanent: false },
      // Contact lives at the bottom of the homepage (general) and /partners (partners).
      { source: '/contact', destination: '/#contact', permanent: false },
    ]
  },
  async rewrites() {
    return [
      // The master plan deck is a standalone HTML page (it has its own slide
      // engine, map and charts). /master-plan wraps it in the site chrome;
      // this serves the bare deck at a clean URL too.
      { source: "/master-plan/deck", destination: "/master-plan-deck.html" },
    ];
  },
};

export default nextConfig;
