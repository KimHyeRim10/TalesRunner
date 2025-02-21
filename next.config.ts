/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  reactStrictMode: true,
  images: {
    /*  domains: ["rzfjmamvpuuxuvsrwbzh.supabase.co"], */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzfjmamvpuuxuvsrwbzh.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/community",
        destination: "/community/runners/all",
        permanent: true,
      },
      {
        source: "/community/runners",
        destination: "/community/runners/all",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value:
              "https://talesrunner-1220.vercel.app, https://talesrunner-be.up.railway.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
