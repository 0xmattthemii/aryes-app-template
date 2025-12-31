import Link from 'next/link';
import Image from 'next/image';
import type { SiteSetting, Media } from '@/types/payload-types';

interface LogoProps {
  isDark?: boolean;
  locale: string;
  logo: SiteSetting['logo'];
}

function isMedia(obj: number | Media | null | undefined): obj is Media {
  return typeof obj === 'object' && obj !== null && 'url' in obj;
}

export function Logo({ isDark = false, locale, logo }: LogoProps) {
  if (logo.type === 'image' && logo.imageLogo) {
    const { logoLight, logoDark, alt } = logo.imageLogo;
    
    // Determine which logo to use based on isDark prop
    const logoToUse = isDark && logoDark && isMedia(logoDark) 
      ? logoDark 
      : logoLight && isMedia(logoLight)
      ? logoLight
      : null;

    if (logoToUse && logoToUse.url) {
      return (
        <Link href={`/${locale}`} className="block">
          <Image
            src={logoToUse.url}
            alt={alt || 'Aryes Logo'}
            width={logoToUse.width || 120}
            height={logoToUse.height || 40}
            className="h-10 w-auto"
            priority
          />
        </Link>
      );
    }
  }

  // Fallback to text logo (either type is 'text' or image logo failed to load)
  const textLogo = logo.textLogo;
  const logoText = textLogo?.text || 'Aryes';
  const logoAccent = textLogo?.accent || '.';

  return (
    <Link 
      href={`/${locale}`} 
      className={`text-3xl font-serif font-medium ${isDark ? 'text-aryes-dark' : 'text-white'}`}
    >
      {logoText}<span className="text-aryes-blue">{logoAccent}</span>
    </Link>
  );
}

