/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.anilist.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.crunchyroll.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
