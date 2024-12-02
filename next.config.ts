/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
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
};

export default nextConfig;
