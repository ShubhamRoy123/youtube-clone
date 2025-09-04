import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
=======
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "image.mux.com",
      // },
      {
        protocol: "https",
        hostname: "utfs.io",
>>>>>>> b10c525 (Initial commit: Upload YouTube clone project)
      },
    ],
  },
};

export default nextConfig;
