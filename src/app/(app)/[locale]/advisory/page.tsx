import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { CTASection } from '@/components/ui/CTASection';
import { RichText } from '@/components/rich-text';
import { fetchAdvisoryPageData } from '@/lib/advisory-page-data';
import type { Media, Industry, ServiceCategory, Service, Config } from '@/types/payload-types';

interface AdvisoryPageProps {
  params: Promise<{ locale: Config['locale'] }>;
}

export default async function Advisory({ params }: AdvisoryPageProps) {
  const { locale } = await params;
  const advisoryPageData = await fetchAdvisoryPageData(locale);

  if (!advisoryPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Advisory page content not found. Please configure it in the admin panel.</p>
      </div>
    );
  }

  const { pageHeader, introSection, practiceAreas, perspectiveSection, industriesSection, ctaSection } = advisoryPageData;

  return (
    <>
      {/* Page Header */}
      {pageHeader && (
        <PageHeader
          category={pageHeader.category}
          title={pageHeader.title}
          subtitle={pageHeader.subtitle}
          image={pageHeader.image as Media | null}
          withBlueLine={pageHeader.withBlueLine ?? true}
          size={pageHeader.size ?? 'standard'}
        />
      )}

      {/* Intro Text */}
      <section className="bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <RevealOnScroll>
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-serif text-aryes-dark mb-8 leading-tight">
                <RichText data={introSection.title} />
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                {introSection.description}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Practice Area 1: Technology - Editorial Layout */}
      {practiceAreas && practiceAreas.length > 0 && practiceAreas.map((practiceArea, index) => {
        const image = practiceArea.image as Media;
        // Type assertion needed until types are regenerated after schema change
        const practiceAreaWithCategory = practiceArea as any;
        // Handle category - could be ID or populated object
        const category = typeof practiceAreaWithCategory.category === 'object' && practiceAreaWithCategory.category !== null
          ? practiceAreaWithCategory.category as ServiceCategory
          : null;
        // Services are now fetched separately and added to practiceArea
        const services = (practiceAreaWithCategory.services || []) as Service[];
        const isOdd = index % 2 !== 0;

        if (!category) return null;

        return (
          <section key={index} className="py-0 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-24 items-center">
                {/* Text Content - First practice area: order-2 lg:order-1, Second: order-2 (default on lg) */}
                <div className={isOdd ? 'order-2 lg:order-1 py-12 lg:py-0' : 'order-2 py-12 lg:py-0'}>
                  <RevealOnScroll delay={100}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-bold tracking-widest text-aryes-blue uppercase">
                        {practiceArea.practiceNumber}
                      </span>
                      <div className="h-px w-12 bg-aryes-blue"></div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif text-aryes-dark mb-6">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-lg text-gray-600 leading-relaxed mb-4 font-light">
                        {category.description}
                      </p>
                    )}
                    {(practiceAreaWithCategory.description as string | undefined) && (
                      <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">
                        {practiceAreaWithCategory.description}
                      </p>
                    )}

                    {services.length > 0 && (
                      <div className="space-y-0 mb-10 border-t border-gray-100">
                        {services.map((service, i) => {
                          const href = `/${locale}/advisory/services/${service.slug}`;
                          
                          return (
                            <Link
                              key={service.id || i}
                              href={href}
                              className="flex items-center justify-between group py-4 border-b border-gray-100 hover:border-aryes-blue transition-colors cursor-pointer"
                            >
                              <div className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-gray-300 group-hover:bg-aryes-blue transition-colors rounded-none mr-4"></div>
                                <span className="text-aryes-dark font-medium group-hover:text-aryes-blue transition-colors text-lg">
                                  {service.title}
                                </span>
                              </div>
                              <ArrowRight 
                                size={16} 
                                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-aryes-blue" 
                              />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </RevealOnScroll>
                </div>

                {/* Image - First practice area: order-1 lg:order-2, Second: order-1 (default on lg) */}
                <div className={isOdd ? 'order-1 lg:order-2 h-[400px] lg:h-[600px] relative w-full' : 'order-1 h-[400px] lg:h-[600px] relative w-full'}>
                  <RevealOnScroll className="h-full">
                    {image?.url && (
                      <Image
                        src={image.url}
                        alt={image.alt || category.name}
                        fill
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                      />
                    )}
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Perspective Section */}
      {perspectiveSection && (
        <section className="bg-aryes-dark text-white py-32 relative overflow-hidden">
          {/* Subtle texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

          <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <div className="w-full md:w-1/3">
                  <h2 className="text-sm font-bold text-aryes-blue uppercase tracking-widest mb-4">
                    {perspectiveSection.label}
                  </h2>
                  <h3 className="text-3xl font-serif text-white">
                    {perspectiveSection.title}
                  </h3>
                </div>

                <div className="w-full md:w-2/3">
                  <blockquote className="text-2xl md:text-3xl font-serif font-light leading-tight mb-12">
                    "{perspectiveSection.quote}"
                  </blockquote>

                  {perspectiveSection.items && perspectiveSection.items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {perspectiveSection.items.map((item, i) => (
                        <div key={i}>
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                            <span className="w-2 h-2 bg-aryes-blue mr-3"></span>
                            {item.title}
                          </h4>
                          <p className="text-gray-400 font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Industries Section */}
      {industriesSection && industriesSection.industries && (
        <Section className="bg-aryes-stone">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-4 border-b border-gray-200">
              <div className="pb-4">
                <h2 className="text-4xl font-serif text-aryes-dark mb-4">
                  {industriesSection.title}
                </h2>
                <p className="text-gray-500 max-w-md">
                  {industriesSection.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {industriesSection.industries.map((industry, idx) => {
                const industryData = industry as Industry;
                if (!industryData) return null;

                const image = industryData.featuredImage as Media;
                const href = `/${locale}/industries/${industryData.slug}`;

                return (
                  <Link
                    key={industryData.id}
                    href={href}
                    className="group relative h-80 overflow-hidden bg-gray-100"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt || industryData.name}
                          fill
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300"></div>
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-aryes-dark/60 group-hover:bg-aryes-dark/30 transition-colors duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="h-px w-8 bg-white/50 mb-4 group-hover:w-16 transition-all duration-500"></div>
                      <h3 className="font-serif text-2xl text-white mb-2">
                        {industryData.name}
                      </h3>
                      <div className="flex items-center text-white/70 text-sm tracking-widest uppercase opacity-0 group-hover:opacity-80 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        View Sector <ArrowRight className="ml-2" size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </RevealOnScroll>
        </Section>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <CTASection
          title={<RichText data={ctaSection.title} />}
          subtitle={ctaSection.subtitle}
          buttonText={ctaSection.buttonText}
          buttonLink={ctaSection.buttonLink.startsWith('/') 
            ? `/${locale}${ctaSection.buttonLink}` 
            : ctaSection.buttonLink}
          className={
            ctaSection.backgroundColor === 'white' 
              ? 'bg-white' 
              : ctaSection.backgroundColor === 'dark'
              ? 'bg-aryes-dark text-white'
              : 'bg-aryes-stone'
          }
        />
      )}
    </>
  );
}

