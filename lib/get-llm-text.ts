import { source } from '@/lib/source';

export const canonicalOrigin = 'https://transitioned.dev';
export type ResearchPage = ReturnType<typeof source.getPages>[number];

export function markdownUrlForPage(page: ResearchPage): string {
  return page.slugs.length === 0 ? '/llms.mdx/approach/index' : `/llms.mdx${page.url}`;
}

export async function getLlmText(page: ResearchPage): Promise<string> {
  const markdown = (await page.data.getText('processed')).trim();
  const title = page.data.title ?? 'Transition research notes';
  const description = page.data.description?.trim();
  const metadata = [
    `# ${title}`,
    description ? `> ${description}` : undefined,
    `Canonical: ${new URL(page.url, canonicalOrigin)}`,
  ].filter(Boolean);
  const lines = markdown.split('\n');
  if (lines[0]?.trim() === `# ${title}`) lines.shift();
  const body = lines.join('\n').trim();
  return `${metadata.join('\n\n')}\n\n${body}\n`;
}
