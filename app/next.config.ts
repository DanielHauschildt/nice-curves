import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nice-curves",
  images: { unoptimized: true },
};

export default nextConfig;
