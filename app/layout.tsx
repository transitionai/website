import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { instrumentSans, ibmPlexMono } from './fonts';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://transitioned.dev'),
  alternates: { canonical: '/' },
  title: { default: 'Transition — From human-native to agent-native', template: '%s — Transition' },
  description: 'Transition your organization from human-native to agent-native. Tools for data analysis, agent-ready codebases, and on-call AI workflows.',
  openGraph: { type: 'website', siteName: 'Transition', title: 'Transition — From human-native to agent-native', description: 'Tools for agent-native work, designed for your infrastructure and choice of models.', url: '/' },
  twitter: { card: 'summary', title: 'Transition — From human-native to agent-native', description: 'Tools for agent-native work.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth"><body className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}><RootProvider theme={{ attribute: 'class', defaultTheme: 'system', enableSystem: true, disableTransitionOnChange: true }} search={{ options: { type: 'static' } }}><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />{children}<SiteFooter /></RootProvider></body></html>;
}
