import { canonicalOrigin, markdownUrlForPage } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export function GET(): Response {
  const pages = source.getPages().map((page) =>
    `- [${page.data.title}](${new URL(markdownUrlForPage(page), canonicalOrigin)}): ${page.data.description ?? 'Transition research notes'}`,
  );
  const index = [
    '# Transition research notes',
    '> Transition is in idea and market research. These notes describe proposed directions, not shipped product capabilities.',
    '## Notes',
    pages.join('\n'),
    `## Full text\n\n- [All research notes](${canonicalOrigin}/llms-full.txt)`,
  ].join('\n\n');
  return new Response(`${index}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
