import Link from 'next/link';
import { SiteControls } from './site-controls';
import { Brand } from './brand';
import { contactHref } from '@/lib/site';

export function SiteHeader() {
  return <header className="site-header"><div className="frame header-inner"><Brand /><nav className="desktop-navigation" aria-label="Main navigation"><Link href="/approach">Approach</Link><a className="nav-contact" href={contactHref}>Let’s talk <span aria-hidden="true">↗</span></a></nav><SiteControls /></div></header>;
}
