import { CopyMarkdown } from './copy-markdown';

const actionClass = 'inline-flex min-h-11 items-center gap-2 rounded-sm border border-fd-border px-3 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-2 focus-visible:ring-fd-ring';

export function DocsPageActions({ markdownUrl, markdown }: Readonly<{ markdownUrl: string; markdown: string }>) {
  return <nav className="my-6 flex flex-wrap gap-2 border-y border-fd-border py-3" aria-label="Research note actions">
    <CopyMarkdown className={actionClass} text={markdown} />
    <a className={actionClass} href={markdownUrl}><svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16"><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" /></svg>View Markdown</a>
  </nav>;
}
