import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
