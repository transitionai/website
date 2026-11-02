'use client';
import { useState } from 'react';
export function CopyMarkdown({ text, className }: { text: string; className?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try { await navigator.clipboard.writeText(text); setStatus('copied'); }
    catch { setStatus('error'); }
  }
  return <><button type="button" className={className} onClick={copy}>{status === 'copied' ? 'Copied Markdown' : 'Copy Markdown'}</button><span role="status" className={status === 'error' ? 'w-full text-sm' : 'sr-only'}>{status === 'copied' ? 'Markdown copied to clipboard.' : status === 'error' ? 'Clipboard access is unavailable. Use View Markdown to select and copy the text.' : ''}</span></>;
}
