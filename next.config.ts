import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dp6cr7ea5/image/upload/**",
      },
    ],
  },
  reactStrictMode: false
};

export default nextConfig;
