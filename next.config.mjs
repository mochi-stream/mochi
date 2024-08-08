/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img1.ak.crunchyroll.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
