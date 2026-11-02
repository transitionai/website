import { getLlmText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

type RouteContext = Readonly<{ params: Promise<{ slug?: string[] }> }>;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams().filter(({ slug }) => slug && slug.length > 0);
}

export async function GET(_request: Request, { params }: RouteContext): Promise<Response> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) return new Response('Not found\n', { status: 404 });
  return new Response(await getLlmText(page), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
