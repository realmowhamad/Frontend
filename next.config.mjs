/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
 
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  i18n: {
    locales: ["fa", "en"], // Define your supported languages here
    defaultLocale: "fa",
    localeDetection: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.persianRiverside.co.uk",
        port: "8556",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9705",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;