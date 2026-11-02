import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
export default function ApproachLayout({ children }: { children: ReactNode }) {
  return <DocsLayout tree={source.pageTree} nav={{ title: 'Research notes', url: '/approach' }} sidebar={{ collapsible: false }} searchToggle={{ enabled: true }} themeSwitch={{ enabled: false }} githubUrl={undefined}>{children}</DocsLayout>;
}
