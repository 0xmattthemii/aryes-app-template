import type { Metadata } from "next";
import { inter, playfair } from '@/lib/fonts';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { PageMetadataProvider } from '@/components/providers/PageMetadata';
import { HeaderClient } from '@/components/layout/HeaderClient';
import { fetchHeaderData } from '@/components/layout/HeaderWrapper';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { fetchFooterData } from '@/lib/footer-data';
import "../globals.css";
import { Config } from "@/types/payload-types";

export const metadata: Metadata = {
  title: "Aryes | Advisory & Capital",
  description: "Technology Advisory & Private Investment",
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Config['locale'] }>;
}) {
  const { locale } = await params;
  const { navigationItems, logo } = await fetchHeaderData(locale);
  const { footer: footerData, logo: footerLogo, address } = await fetchFooterData(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-aryes-light flex flex-col min-h-screen">
        <LoadingScreen />
        <SmoothScroll>
          <PageMetadataProvider>
            {/* Fetch header data on server, pass to client component */}
            <HeaderClient locale={locale} navigationItems={navigationItems} logo={logo} />
            <main className="grow">
              {children}
            </main>
            <Footer locale={locale} footerData={footerData} logo={footerLogo} address={address} />
          </PageMetadataProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}