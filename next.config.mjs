/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // ImgBB
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc", // Postimages
      },
    ],
  },
};

export default nextConfig;
