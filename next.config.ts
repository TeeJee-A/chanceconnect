import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Hostinger caps processes/threads per account; one build worker stays under it.
    cpus: 1,
  },
};

export default withNextIntl(nextConfig);
