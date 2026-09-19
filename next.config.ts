import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://github.com/llanesluis.png")],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
