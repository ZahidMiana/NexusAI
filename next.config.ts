import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hide the Next.js dev tools button in the corner during `npm run dev` (errors still show).
  devIndicators: false,
  experimental: {
    // Contact form brief uploads are capped at 4 MB (see lib/contact/attachment.ts).
    serverActions: { bodySizeLimit: "4.5mb" },
  },
};

export default nextConfig;
