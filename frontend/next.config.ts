import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    URL_SERVER_API: "http://localhost:5000/api",
  },
};

export default nextConfig;
