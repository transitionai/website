import { getLlmText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const page = source.getPage([]);
  if (!page) throw new Error('The approach research note is missing.');
  return new Response(await getLlmText(page), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
