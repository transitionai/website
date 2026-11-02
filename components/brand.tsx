import Link from 'next/link';

export function Mark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 8h6l8 8h10M4 16h24M4 24h6l8-8" stroke="currentColor" strokeWidth="3" strokeLinejoin="miter" /></svg>;
}

export function Brand() {
  return <Link className="brand" href="/" aria-label="Transition home"><Mark /><span>Transition</span></Link>;
}
