import { getPayload } from 'payload';
import config from '@payload-config';
import type { HomePage } from '@/types/payload-types';

export async function fetchHomePageData(locale: string): Promise<HomePage | null> {
  const payload = await getPayload({ config });

  const homePage = await payload.findGlobal({
    slug: 'home-page',
    locale: locale as 'en' | 'fr',
    depth: 2, // Populate relationships (videos, images, team members)
  });

  return homePage as HomePage | null;
}