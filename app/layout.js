import './globals.css';
import Link from 'next/link';
import { site } from '../lib/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.title}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { title: site.title, description: site.description, url: site.url, type: 'website' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">{site.title}</Link>
          <nav>
            <a href={site.repo} rel="noopener">GitHub</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          © {new Date().getFullYear()} {site.author}. Built with Next.js, deployed to GitHub Pages and Vercel.
        </footer>
      </body>
    </html>
  );
}
