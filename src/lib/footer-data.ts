import { getPayload } from 'payload';
import config from '@payload-config';
import type { Footer, SiteSetting } from '@/types/payload-types';

export async function fetchFooterData(locale: string) {
  const payload = await getPayload({ config });

  const footer = await payload.findGlobal({
    slug: 'footer',
    locale: locale as 'en' | 'fr',
  });

  // Fetch site settings for logo
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as 'en' | 'fr',
    depth: 2, // Populate logo images if using image logo
  });

  return {
    footer: footer as Footer | null,
    logo: (siteSettings as SiteSetting).logo,
    address: (siteSettings as SiteSetting).company?.address?.display || null,
  };
}

