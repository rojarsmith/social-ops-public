// Static export only: the same build must run on Vercel (root path) and on
// GitHub Pages (served under /<repo>/ unless a custom domain is set).
const onPages = process.env.GITHUB_PAGES === 'true';
const repo = 'social-ops-public';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: onPages ? `/${repo}` : '',
  assetPrefix: onPages ? `/${repo}/` : undefined,
};

export default nextConfig;
