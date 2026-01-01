import type { NextConfig } from "next";

const repoName = "dough-calculator";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
