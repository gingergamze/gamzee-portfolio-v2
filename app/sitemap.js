import { works } from './lib/works';
import { SITE_URL } from './lib/site';

// The list of pages search engines should know about. Case studies that are
// still under construction are left out.
export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...works
      .filter((w) => !w.underConstruction)
      .map((w) => ({ url: `${SITE_URL}/work/${w.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })),
  ];
}
