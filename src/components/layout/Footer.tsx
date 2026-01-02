'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Globe, Twitter } from 'lucide-react';
import type { Footer, SiteSetting } from '@/types/payload-types';
import { Logo } from './Logo';

interface FooterProps {
  locale: string;
  footerData: Footer | null;
  logo: SiteSetting['logo'];
  address: string | null;
}

export function Footer({ locale, footerData, logo, address }: FooterProps) {
  const pathname = usePathname();

  // Helper function to get social media icon
  const getSocialIcon = (platform: 'linkedin' | 'twitter' | 'other') => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        return <Globe size={20} />;
    }
  };

  // Helper function to format copyright text
  const formatCopyright = (copyrightText: string) => {
    const currentYear = new Date().getFullYear();
    return copyrightText
      .replace(/{year}/g, currentYear.toString())
      .replace(/{company}/g, 'Aryes Advisory SA')
      .replace(/{location}/g, 'Geneva, Switzerland');
  };

  // Fallback if no footer data
  if (!footerData) {
    return (
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Aryes Advisory SA · Geneva, Switzerland</p>
          </div>
        </div>
      </footer>
    );
  }

  const { companyLinks, legalLinks, socialLinks, copyright } = footerData;
  const companyColumnTitle = (footerData as any).companyColumnTitle;
  const legalColumnTitle = (footerData as any).legalColumnTitle;
  const languageColumnTitle = (footerData as any).languageColumnTitle;

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6 scale-75 origin-left">
              <Logo locale={locale} logo={logo} isDark={true} />
            </div>
            {address && (
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{address}</p>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.id || social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-aryes-blue transition-colors"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            {companyLinks && companyLinks.length > 0 && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">{companyColumnTitle || 'Company'}</h4>
                <ul className="space-y-4">
                  {companyLinks.map((link) => {
                    const href = link.href.startsWith('/') ? `/${locale}${link.href}` : link.href;
                    return (
                      <li key={link.id || link.href}>
                        <Link href={href} className="text-sm text-gray-600 hover:text-aryes-blue">
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {legalLinks && legalLinks.length > 0 && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">{legalColumnTitle || 'Legal'}</h4>
                <ul className="space-y-4">
                  {legalLinks.map((link) => {
                    const href = link.href.startsWith('/') ? `/${locale}${link.href}` : link.href;
                    return (
                      <li key={link.id || link.href}>
                        <Link href={href} className="text-sm text-gray-600 hover:text-aryes-blue">
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">{languageColumnTitle || 'Language'}</h4>
            <div className="text-sm font-medium flex items-center">
              {locale === 'en' ? (
                <>
                  <Link
                    href={pathname?.replace(`/${locale}`, '/fr') || '/fr'}
                    className="text-gray-500 hover:text-aryes-dark transition-colors"
                  >
                    FR
                  </Link>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-gray-900">EN</span>
                </>
              ) : (
                <>
                  <span className="text-gray-900">FR</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <Link
                    href={pathname?.replace(`/${locale}`, '/en') || '/en'}
                    className="text-gray-500 hover:text-aryes-dark transition-colors"
                  >
                    EN
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>{formatCopyright(copyright)}</p>
        </div>
      </div>
    </footer>
  );
}

