import { getPayload } from 'payload';
import config from '@payload-config';
import { Header } from './Header';
import type { MegaMenu, SiteSetting, Config } from '@/types/payload-types';

interface HeaderWrapperProps {
  locale: Config['locale'];
}

// Export data fetching function separately for use in server components
export async function fetchHeaderData(locale: string) {
  const payload = await getPayload({ config });

  // Fetch navigation global with populated megaMenu relationships
  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'fr',
    depth: 3, // Deep populate: navigation -> megaMenu -> serviceCategories -> services/categories, industries
  });

  // Fetch site settings for logo
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as 'en' | 'fr',
    depth: 2, // Populate logo images if using image logo
  });

  // Transform navigation items and ensure mega menus are fully populated
  const navigationItems = await Promise.all(
    (navigation.items || []).map(async (item) => {
      if (item.megaMenu) {
        // If megaMenu is just an ID, fetch the full document
        if (typeof item.megaMenu === 'number') {
          const megaMenu = await payload.findByID({
            collection: 'mega-menus',
            id: item.megaMenu,
            depth: 3, // Populate serviceCategories.services, serviceCategories.category, industries
            locale: locale as 'en' | 'fr',
          });
          return {
            ...item,
            megaMenu: megaMenu as MegaMenu,
          };
        }
        // If it's already populated, check if relationships need fetching
        const megaMenu = item.megaMenu as MegaMenu;
        // Check if serviceCategories or industries need to be populated
        const industriesData = megaMenu.industries;
        const industriesNeedsFetch = Array.isArray(industriesData)
          ? industriesData.some((i) => typeof i === 'number')
          : false;
        
        const needsFetch =
          megaMenu.id &&
          (megaMenu.serviceCategories?.some(
            (sc) => typeof sc === 'object' && sc.services?.some((s) => typeof s === 'number')
          ) || industriesNeedsFetch);
        
        if (needsFetch && megaMenu.id) {
          const fullMegaMenu = await payload.findByID({
            collection: 'mega-menus',
            id: megaMenu.id,
            depth: 3,
            locale: locale as 'en' | 'fr',
          });
          return {
            ...item,
            megaMenu: fullMegaMenu as MegaMenu,
          };
        }
        return {
          ...item,
          megaMenu: megaMenu,
        };
      }
      return item;
    })
  );

  return {
    navigationItems,
    logo: (siteSettings as SiteSetting).logo,
  };
}

export async function HeaderWrapper({ locale }: HeaderWrapperProps) {
  const { navigationItems, logo } = await fetchHeaderData(locale);
  return <Header locale={locale} navigationItems={navigationItems} logo={logo} />;
}

