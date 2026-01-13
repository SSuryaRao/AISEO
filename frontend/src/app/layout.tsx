import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI SEO Optimizer - Optimize Your Blog for AI Chatbots',
  description:
    'Optimize your blog content for AI chatbots like ChatGPT and Perplexity with advanced SEO techniques, schema markup, and content improvements.',
  keywords: [
    'AI SEO',
    'Blog Optimization',
    'ChatGPT SEO',
    'Perplexity Optimization',
    'Schema Markup',
    'Content Optimization',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
