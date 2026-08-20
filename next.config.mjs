/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Verification builds write somewhere else so they cannot overwrite the
   * running dev server's output. `npm run dev` uses .next; `npm run verify`
   * uses .next-verify. Running a plain `next build` while dev is running
   * corrupts the dev server's client manifest and serves 404s for CSS.
   */
  distDir: process.env.BUILD_DIR || ".next",
  images: {
    // TODO: add any remote image hosts here if you end up serving covers from a CDN.
    // Local files in /public need no config.
    remotePatterns: [],
  },
};

export default nextConfig;
