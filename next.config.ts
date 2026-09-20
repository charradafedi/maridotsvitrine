import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Cloudflare local bindings for `next dev` — load asynchronously so the
// ESM package does not break config evaluation under CommonJS require().
if (process.env.NODE_ENV === "development") {
  void import("@opennextjs/cloudflare")
    .then(({ initOpenNextCloudflareForDev }) => initOpenNextCloudflareForDev())
    .catch(() => {
      // Optional during local marketing-site work when bindings are unavailable.
    });
}
