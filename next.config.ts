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
      // The plan now lives inside the thesis.
      { source: '/master-plan', destination: '/thesis#flywheel', permanent: false },
      { source: '/thesis/artists-and-paleontologists', destination: '/thesis/sculptures-vs-fossils', permanent: true },
      { source: '/thesis/art-and-fossils', destination: '/thesis/sculptures-vs-fossils', permanent: true },
    ]
  },
  async rewrites() {
    return [
      // The October 2026 master plan slide deck, archived for reuse. It is a
      // standalone HTML page (its own slide engine, map and charts) and is not
      // linked from the site.
      { source: "/archive/master-plan-deck", destination: "/archive/master-plan-deck.html" },
    ];
  },
};

export default nextConfig;
