/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tracking links for applications: /c/<company> shows the homepage and
  // /c/<company>/<case-study> shows that case study. The address in the browser stays
  // /c/<company>, so the free Vercel Analytics "Pages" report counts visits per company.
  async rewrites() {
    return [
      { source: '/c/:company', destination: '/' },
      { source: '/c/:company/:slug', destination: '/work/:slug' },
    ];
  },
};

export default nextConfig;
