'use client';
import Link from 'next/link';
import type { MegaMenu as MegaMenuType, ServiceCategory, Service, Industry } from '@/types/payload-types';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  closeMenu: () => void;
  locale: string;
  megaMenu: MegaMenuType;
  basePath: string; // Base path from the navigation item href
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave, closeMenu, locale, megaMenu, basePath }: MegaMenuProps) {
  return (
    <div
      className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl pt-10 pb-14 px-6 z-40 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Overview Column (3 cols) */}
        {megaMenu.overviewLink?.href && (
          <div className="md:col-span-3 border-r border-gray-100 pr-8">
            {megaMenu.overviewLink.sectionLabel && (
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                {megaMenu.overviewLink.sectionLabel}
              </h3>
            )}
            <Link
              href={`/${locale}${megaMenu.overviewLink.href}`}
              onClick={closeMenu}
              className="text-lg font-serif text-aryes-dark hover:text-aryes-blue transition-colors block"
            >
              {megaMenu.overviewLink.label || ''} →
            </Link>
          </div>
        )}

        {/* Services Column (6 cols) */}
        {megaMenu.serviceCategories && megaMenu.serviceCategories.length > 0 && (
          <div className={`md:col-span-6 border-r border-gray-100 px-8 ${!megaMenu.overviewLink?.href ? 'md:col-span-9' : ''}`}>
            {(() => {
              const servicesColumnTitle = megaMenu?.servicesColumnTitle as string | undefined;
              const urlPathSegment = (megaMenu?.servicesUrlPathSegment as string | undefined) || 'services';
              
              return (
                <>
                  {servicesColumnTitle && (
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">{servicesColumnTitle}</h3>
                  )}
                  <div className="grid grid-cols-2 gap-12">
                    {megaMenu.serviceCategories.map((serviceCategory) => {
                      if (typeof serviceCategory.category === 'object' && serviceCategory.services) {
                        const category = serviceCategory.category as ServiceCategory;
                        const services = Array.isArray(serviceCategory.services)
                          ? serviceCategory.services.filter((s): s is Service => s !== null && typeof s === 'object')
                          : [];
                        
                        if (services.length === 0) return null;

                        return (
                          <div key={category.id}>
                            <h4 className="text-lg font-serif text-aryes-dark mb-4 pb-2 border-b border-gray-100">
                              {category.name}
                            </h4>
                            <ul className="space-y-3">
                              {services.map((service) => (
                                <li key={service.id}>
                                  <Link
                                    href={`/${locale}${basePath}/${urlPathSegment}/${service.slug}`}
                                    onClick={closeMenu}
                                    className="text-sm text-gray-600 hover:text-aryes-blue transition-colors block py-1"
                                  >
                                    {service.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Industries Column (3 cols) */}
        {(() => {
          const industriesData = megaMenu.industries;
          const industriesList = Array.isArray(industriesData)
            ? industriesData.filter((i): i is Industry => i !== null && typeof i === 'object')
            : [];
          
          const urlPathSegment = (megaMenu?.industriesUrlPathSegment as string | undefined) || 'industries';
          const industriesColumnTitle = megaMenu?.industriesColumnTitle as string | undefined;

          if (industriesList.length === 0) return null;

          return (
            <div className={`md:col-span-3 pl-4 ${!megaMenu.serviceCategories || megaMenu.serviceCategories.length === 0 ? 'md:col-span-10' : ''}`}>
              {industriesColumnTitle && (
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">{industriesColumnTitle}</h3>
              )}
              <ul className="space-y-3">
                {industriesList.map((industry) => (
                  <li key={industry.id}>
                    <Link
                      href={`/${locale}${basePath}/${urlPathSegment}/${industry.slug}`}
                      onClick={closeMenu}
                      className="text-sm text-gray-600 hover:text-aryes-blue transition-colors block py-1"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

