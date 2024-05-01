/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/dashboard",
        destination: "/dashboards",
        permanent: false,
      },
      {
        source: "/table",
        destination: "/tables",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/aboutus",
        permanent: false,
      },
      {
        source: "/services",
        destination: "/service",
        permanent: false,
      },
      {
        source: "/blogs",
        destination: "/blog1",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/contactus",
        permanent: false,
      },
    ];
  },

  images: {
    domains: [
      "tailwindui.com",
      "www.w3.org",
      "images.unsplash.com",
      "ohio.clbthemes.com",
      "demo.rivaxstudio.com",
    ],
  },

  swcMinify: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-blob.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },

  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
