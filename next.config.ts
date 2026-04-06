import type { NextConfig } from "next";

const domainRedirects = [
  { source: 'montessorimakers.org', destination: '' },
  { source: 'www.montessorimakers.org', destination: '' },
  { source: 'montessorimakersmatchhub.com', destination: '/matchhub' },
  { source: 'montessorimakersalignmentmap.com', destination: '/mmap' },
  { source: 'www.montessorimakersalignmentmap.com', destination: '/mmap' },
  { source: 'montessorimakerslearning.org', destination: '/learning' },
  { source: 'montessorimakersinstitute.org', destination: '/institute' },
  { source: 'montessorimakersstudio.com', destination: '/studio' },
  { source: 'montessorimakersassessmentsystem.com', destination: '/mmas' },
  { source: 'montessorimakerstoolbox.com', destination: '/toolbox' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nhfhvxcmfgunhfdxhcyf.supabase.co',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return domainRedirects.flatMap(({ source: host, destination }) => [
      {
        source: '/',
        has: [{ type: 'host' as const, value: host }],
        destination: `https://montessorimakersgroup.org${destination}`,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: host }],
        destination: `https://montessorimakersgroup.org${destination}`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
