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
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: `https://aro-nutra-admin-2026.vercel.app/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `https://aro-nutra-admin-2026.vercel.app/admin/:path*`,
      },
    ]
  },
};

export default nextConfig;
