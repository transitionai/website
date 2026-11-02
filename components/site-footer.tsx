import { Brand } from './brand';
import { contactEmail } from '@/lib/site';
export function SiteFooter() {
  return <footer className="site-footer"><div className="frame footer-inner"><Brand /><p>Tools for agent-native work.</p><a href={`mailto:${contactEmail}`}>Email the founders <span aria-hidden="true">↗</span></a><span className="footer-year">© {new Date().getFullYear()} Transition</span></div></footer>;
}
