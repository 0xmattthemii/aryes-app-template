'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import type { Navigation, SiteSetting } from '@/types/payload-types';

interface HeaderClientProps {
  locale: string;
  navigationItems: NonNullable<Navigation['items']>;
  logo: SiteSetting['logo'];
}

export function HeaderClient({ locale, navigationItems, logo }: HeaderClientProps) {
  const pathname = usePathname();
  
  // Use pathname as key to force remount on route change
  return <Header key={pathname} locale={locale} navigationItems={navigationItems} logo={logo} />;
}

