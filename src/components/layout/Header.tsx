'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { MegaMenu } from './MegaMenu';
import { usePageMetadata } from '@/components/providers/PageMetadata';
import type { Navigation, MegaMenu as MegaMenuType, SiteSetting, Config } from '@/types/payload-types';
import { Services } from '@/payload/collections/Services';
import { getCollectionLabel } from '@/lib/collection-labels';

interface HeaderProps {
  locale: Config['locale'];
  navigationItems: NonNullable<Navigation['items']>;
  logo: SiteSetting['logo'];
}

type NavigationItemWithMegaMenu = NonNullable<Navigation['items']>[number] & {
  megaMenu: MegaMenuType;
};

export function Header({ locale, navigationItems, logo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  // Track which mega menu is open by navigation item ID
  const [openMegaMenuId, setOpenMegaMenuId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Separate navigation items: those with mega menus and regular links
  const itemsWithMegaMenus = navigationItems.filter(
    (item): item is NavigationItemWithMegaMenu =>
      item.megaMenu !== null &&
      item.megaMenu !== undefined &&
      typeof item.megaMenu === 'object'
  );
  
  const regularNavLinks = navigationItems.filter((item) => !item.megaMenu);

  // Get hero type from page metadata context
  const { isLightHeroPage } = usePageMetadata();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    // Check initial scroll position on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (itemId: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenMegaMenuId(itemId);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpenMegaMenuId(null);
    }, 200);
  };

  // Check if any mega menu is open
  const isAnyMegaMenuOpen = openMegaMenuId !== null;

  // Logic:
  // 1. If Menu is Open -> Text is Dark (background is white)
  // 2. If Mobile Menu Open -> Text is Dark (background is white)
  // 3. If Scrolled -> Text is Dark (background is white)
  // 4. If Page has Light Hero -> Text is Dark (background is transparent)
  // 5. ELSE (Page has Dark Hero AND not scrolled/open) -> Text is White
  const useDarkText = isAnyMegaMenuOpen || isMobileOpen || isScrolled || isLightHeroPage;

  // Background state
  let headerBgClass = isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent';

  if (isAnyMegaMenuOpen || isMobileOpen) headerBgClass = 'bg-white';

  const textColorClass = useDarkText ? 'text-gray-800' : 'text-white';
  const hoverColorClass = useDarkText ? 'hover:text-aryes-blue' : 'hover:text-gray-300';

  // Padding logic: Only shrink if scrolled. Opening menu at top shouldn't shrink.
  const paddingClass = isScrolled ? 'py-4' : 'py-6';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div
        className={`relative z-50 max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between transition-all duration-300 ${paddingClass}`}
      >
        <Logo isDark={useDarkText} locale={locale} logo={logo} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {itemsWithMegaMenus.map((item) => {
            const itemId = item.id || item.href;
            const isOpen = openMegaMenuId === itemId;
            return (
              <div
                key={itemId}
                className="h-full flex items-center py-2"
                onMouseEnter={() => handleMouseEnter(itemId)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  className={`flex items-center space-x-1 text-base font-medium transition-colors ${
                    isOpen ? 'text-aryes-blue' : textColorClass
                  } ${hoverColorClass}`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </Link>
              </div>
            );
          })}

          {regularNavLinks.map((link) => {
            const linkId = link.id || link.href;
            return (
              <Link
                key={linkId}
                href={`/${locale}${link.href}`}
                className={`text-base font-medium transition-colors ${textColorClass} ${hoverColorClass}`}
                onMouseEnter={() => setOpenMegaMenuId(null)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className={`h-4 w-px mx-4 ${useDarkText ? 'bg-gray-300' : 'bg-white/30'}`}></div>

          <div className="text-base font-medium flex items-center">
            {locale === 'en' ? (
              <>
                <Link
                  href={pathname?.replace(`/${locale}`, '/fr') || '/fr'}
                  className={`transition-colors ${
                    useDarkText ? 'text-gray-500 hover:text-aryes-dark' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  FR
                </Link>
                <span className={`mx-2 ${useDarkText ? 'text-gray-300' : 'text-white/30'}`}>|</span>
                <span className={useDarkText ? 'text-gray-900' : 'text-white'}>EN</span>
              </>
            ) : (
              <>
                <span className={useDarkText ? 'text-gray-900' : 'text-white'}>FR</span>
                <span className={`mx-2 ${useDarkText ? 'text-gray-300' : 'text-white/30'}`}>|</span>
                <Link
                  href={pathname?.replace(`/${locale}`, '/en') || '/en'}
                  className={`transition-colors ${
                    useDarkText ? 'text-gray-500 hover:text-aryes-dark' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${useDarkText ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mega Menus */}
      {itemsWithMegaMenus.map((item) => {
        const itemId = item.id || item.href;
        const isOpen = openMegaMenuId === itemId;
        return (
          <MegaMenu
            key={itemId}
            isOpen={isOpen}
            onMouseEnter={() => handleMouseEnter(itemId)}
            onMouseLeave={handleMouseLeave}
            closeMenu={() => setOpenMegaMenuId(null)}
            locale={locale}
            megaMenu={item.megaMenu}
            basePath={item.href}
          />
        );
      })}

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white h-screen overflow-y-auto px-8 md:px-12 py-8 border-t border-gray-100">
          {itemsWithMegaMenus.map((item) => {
            const itemId = item.id || item.href;
            return (
              <div key={itemId} className="mb-8">
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-xl font-serif mb-4 text-aryes-dark"
                >
                  {item.label}
                </Link>
                <div className="pl-4 border-l border-gray-200 space-y-6">
                  {item.megaMenu.serviceCategories && item.megaMenu.serviceCategories.length > 0 && (
                    <>
                      {(() => {
                        const megaMenuAny = item.megaMenu;
                        const urlPathSegment = (megaMenuAny?.servicesUrlPathSegment as string | undefined) || 'services';
                        
                        return (
                          <>
                            {item.megaMenu.serviceCategories.map((serviceCategory) => {
                              if (typeof serviceCategory.category === 'object' && serviceCategory.services) {
                                const category = serviceCategory.category;
                                const services = Array.isArray(serviceCategory.services)
                                  ? serviceCategory.services.filter((s): s is NonNullable<typeof s> => s !== null && typeof s === 'object')
                                  : [];
                                
                                if (services.length === 0) return null;
                                
                                return (
                                  <div key={category.id} className="mb-6">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                                      {getCollectionLabel(Services, locale, 'plural')} | {category.name.toUpperCase()}
                                    </p>
                                    <ul className="space-y-2">
                                      {services.map((service) => {
                                        if (typeof service === 'object' && 'slug' in service && 'title' in service) {
                                          return (
                                            <li key={service.id}>
                                              <Link
                                                href={`/${locale}${item.href}/${urlPathSegment}/${service.slug}`}
                                                onClick={() => setIsMobileOpen(false)}
                                                className="text-sm text-gray-600 hover:text-aryes-blue transition-colors block py-1"
                                              >
                                                {service.title}
                                              </Link>
                                            </li>
                                          );
                                        }
                                        return null;
                                      })}
                                    </ul>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </>
                        );
                      })()}
                    </>
                  )}
                  {(() => {
                    const industriesData = item.megaMenu.industries;
                    const industriesList = Array.isArray(industriesData)
                      ? industriesData.filter((i): i is NonNullable<typeof industriesData[number]> & { id: number; slug: string; name: string } => 
                          i !== null && typeof i === 'object' && 'id' in i && 'slug' in i && 'name' in i
                        )
                      : [];
                    
                    const megaMenuAny = item.megaMenu;
                    const urlPathSegment = (megaMenuAny?.industriesUrlPathSegment as string | undefined) || 'industries';
                    const industriesColumnTitle = megaMenuAny?.industriesColumnTitle as string | undefined;

                    if (industriesList.length === 0) return null;

                    return (
                      <>
                        {industriesColumnTitle && (
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-4">{industriesColumnTitle}</p>
                        )}
                        <ul className="space-y-2">
                          {industriesList.map((industry) => (
                            <li key={industry.id}>
                              <Link
                                href={`/${locale}${item.href}/${urlPathSegment}/${industry.slug}`}
                                onClick={() => setIsMobileOpen(false)}
                                className="text-sm text-gray-600 hover:text-aryes-blue transition-colors block py-1"
                              >
                                {industry.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                </div>
              </div>
            );
          })}

          {regularNavLinks.map((link) => {
            const linkId = link.id || link.href;
            return (
              <Link
                key={linkId}
                href={`/${locale}${link.href}`}
                onClick={() => setIsMobileOpen(false)}
                className="block text-xl font-serif mb-6 text-aryes-dark"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

