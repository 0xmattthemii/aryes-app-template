'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Globe } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const pathname = usePathname();
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href={`/${locale}`} className="text-2xl font-serif font-medium tracking-tight text-aryes-dark block mb-6">
              Aryes<span className="text-aryes-blue">.</span>
            </Link>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-aryes-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href={`/${locale}/advisory`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    Advisory
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/capital`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    Capital
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/about`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    About
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href={`/${locale}/legal/imprint`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    Imprint
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/legal/privacy`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/legal/terms`} className="text-sm text-gray-600 hover:text-aryes-blue">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">Language</h4>
            <Link
              href={pathname?.replace(`/${locale}`, locale === 'en' ? '/fr' : '/en') || `/${locale === 'en' ? 'fr' : 'en'}`}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-aryes-dark"
            >
              <Globe size={16} />
              <span>{locale === 'en' ? 'English' : 'Français'}</span>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Aryes Advisory SA · Geneva, Switzerland</p>
        </div>
      </div>
    </footer>
  );
}

