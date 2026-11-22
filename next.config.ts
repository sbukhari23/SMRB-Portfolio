import type { NextConfig } from "next";

const repoName = "SMRB-Portfolio";
const basePath = `/${repoName}`;

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
