'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { useTheme } from 'fumadocs-ui/provider/base';
import { contactHref } from '@/lib/site';

const subscribe = () => () => undefined;
export function SiteControls() {
  const { setOpenSearch } = useSearchContext();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const ready = mounted && ['light', 'dark'].includes(resolvedTheme ?? '');
  const dark = resolvedTheme === 'dark';
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 701px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', escape);
    desktop.addEventListener('change', resize);
    return () => { window.removeEventListener('keydown', escape); desktop.removeEventListener('change', resize); };
  }, [open]);
  return <div className="site-controls">
    <button className="icon-control search-control" type="button" aria-label="Search research notes" onClick={() => { setOpen(false); setOpenSearch(true); }}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span className="control-label">Search</span><kbd className="control-label">⌘ K</kbd></button>
    <button className="icon-control" type="button" disabled={!ready} aria-label={ready ? `Switch to ${dark ? 'light' : 'dark'} theme` : 'Choose color theme'} aria-pressed={ready ? dark : undefined} onClick={() => setTheme(dark ? 'light' : 'dark')}>
      {ready && dark ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15A8.5 8.5 0 0 1 9 4a8.5 8.5 0 1 0 11 11Z"/></svg>}
    </button>
    <button ref={menuButton} className="icon-control mobile-menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={open ? 'm6 6 12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16'}/></svg></button>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation"><Link href="/approach" onClick={() => setOpen(false)}>Approach</Link><Link href="/approach/design-questions" onClick={() => setOpen(false)}>Design questions</Link><a href={contactHref} onClick={() => setOpen(false)}>Talk to the founders ↗</a></nav>}
  </div>;
}
