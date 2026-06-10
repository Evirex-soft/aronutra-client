const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aronutra-assets.s3.ap-south-1.amazonaws.com",
      },
    ],
  },

};

export default nextConfig;
