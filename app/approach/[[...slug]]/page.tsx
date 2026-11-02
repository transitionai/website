import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { source } from '@/lib/source';
import { DocsPageActions } from '@/components/docs-page-actions';
import { getLlmText, markdownUrlForPage } from '@/lib/get-llm-text';
import { getMDXComponents } from '@/mdx-components';
type PageProps = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return source.generateParams(); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = source.getPage((await params).slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description, alternates: { canonical: page.url } };
}
export default async function ApproachPage({ params }: PageProps) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();
  const MDX = page.data.body;
  return <DocsPage toc={page.data.toc} id="main-content" role="main"><DocsTitle>{page.data.title}</DocsTitle><DocsDescription>{page.data.description}</DocsDescription><DocsPageActions markdownUrl={markdownUrlForPage(page)} markdown={await getLlmText(page)} /><DocsBody className="approach-docs-body"><MDX components={getMDXComponents()} /></DocsBody></DocsPage>;
}
