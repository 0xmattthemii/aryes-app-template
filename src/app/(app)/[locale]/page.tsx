import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { Section } from '@/components/ui/Section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchHomePageData } from '@/lib/home-page-data';
import { HeroVideos } from '@/components/home/HeroVideos';
import { ParallaxTeamImages } from '@/components/home/ParallaxTeamImages';
import type { Media, TeamMember } from '@/types/payload-types';
import { RichText } from '@/components/rich-text';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homePageData = await fetchHomePageData(locale);

  if (!homePageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Home page content not found. Please configure it in the admin panel.</p>
      </div>
    );
  }

  const { hero, whatWeDo, approach, leadership, contact } = homePageData;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-aryes-dark grain grain-light">
        {/* Rotating Background Videos */}
        {hero.videos && hero.videos.length > 0 && (
          <HeroVideos videos={hero.videos.filter((v): v is { video: Media; id?: string | null } => 
            typeof v.video === 'object' && v.video !== null
          )} />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-serif font-medium text-white mb-8 leading-[1.1] tracking-tight">
              {hero.title} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-aryes-blue to-blue-300">
                {hero.titleHighlight}
              </span>
            </h1>
            <div className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light border-l border-aryes-blue/50 pl-6">
              <RichText data={hero.subtitle} />
            </div>

            <div className="flex flex-col items-start gap-8 mt-12">
              {/* CTA Buttons */}
              {hero.ctaButtons && hero.ctaButtons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                  {hero.ctaButtons.map((button, index) => {
                    const href = button.href.startsWith('/') ? `/${locale}${button.href}` : button.href;
                    const isPrimary = button.style === 'primary';

                    if (isPrimary) {
                      return (
                        <Link
                          key={button.id || index}
                          href={href}
                          className="group relative flex items-center justify-between gap-12 pl-8 pr-2 py-2 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 w-full sm:w-auto min-w-[210px]"
                        >
                          <span className="text-white tracking-[0.2em] text-sm font-medium uppercase">
                            {button.label}
                          </span>
                          <div className="w-9 h-9 bg-aryes-blue flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-aryes-blue">
                            <ArrowRight
                              size={20}
                              className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-400"
                            />
                          </div>
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={button.id || index}
                        href={href}
                        className="flex items-center justify-center px-6 py-4 border border-white/30 text-white hover:bg-white hover:text-aryes-dark transition-colors text-sm font-medium tracking-widest min-w-[200px]"
                      >
                        {button.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/30">
          <span className="text-[10px] uppercase tracking-[0.3em] mb-3">{hero.scrollLabel || 'Scroll'}</span>
          <div className="h-12 w-px bg-linear-to-b from-white/0 via-white/50 to-white/0"></div>
        </div>
      </section>

      {/* What We Do */}
      {whatWeDo?.cards && whatWeDo.cards.length > 0 && (
        <Section className="bg-aryes-stone relative overflow-hidden py-32">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/50 to-transparent pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {whatWeDo.cards.map((card, index) => {
              const image = card.image as Media;
              const href = card.href.startsWith('/') ? `/${locale}${card.href}` : card.href;
              const isEven = index % 2 === 1;

              return (
                <RevealOnScroll key={card.id || index} delay={index * 200}>
                  <Link
                    href={href}
                    className="group relative block h-[550px] overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700"
                  >
                    <div className="absolute inset-0">
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={image.alt || card.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      )}
                      <div
                        className={`absolute inset-0 ${
                          isEven ? 'bg-aryes-navy/90 group-hover:bg-aryes-navy/80' : 'bg-aryes-dark/90 group-hover:bg-aryes-dark/80'
                        } transition-colors duration-700`}
                      ></div>
                    </div>

                    <div className="relative h-full flex flex-col justify-end p-12 md:p-16">
                      <div className="mb-auto transform group-hover:-translate-y-2 transition-transform duration-700">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-white/20">
                          {card.badge}
                        </span>
                      </div>
                      <h3 className="text-4xl font-serif text-white mb-6 leading-tight whitespace-pre-line">
                        {card.title}
                      </h3>
                      <div
                        className={`w-12 h-1 mb-8 transform origin-left group-hover:scale-x-150 transition-transform duration-500 ${
                          isEven ? 'bg-white/50' : 'bg-aryes-blue'
                        }`}
                      ></div>
                      <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md opacity-90">
                        {card.description}
                      </p>
                      <div className="flex items-center text-white font-medium tracking-wide">
                        {whatWeDo.learnMoreLabel || 'Learn more'} <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </Section>
      )}

      {/* The Approach - Image on Left, No Gradient */}
      {approach && (
        <Section className="relative bg-white py-32">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative h-[500px] overflow-hidden shadow-2xl">
              <RevealOnScroll className="h-full">
                {(() => {
                  const image = approach.image as Media;
                  return image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || ''}
                      fill
                      className="object-cover grayscale opacity-100 hover:scale-105 transition-transform duration-700"
                    />
                  ) : null;
                })()}
              </RevealOnScroll>
            </div>
            <div className="w-full md:w-1/2">
              <RevealOnScroll>
                <div className="text-sm font-bold text-aryes-blue uppercase tracking-widest mb-6">
                  {approach.label}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-aryes-dark leading-tight mb-8">
                  <RichText data={approach.title} />
                </h2>
                <div className="text-xl text-gray-500 font-light leading-relaxed mb-8">
                  {approach.description}
                </div>
                <Link
                  href={approach.ctaHref.startsWith('/') ? `/${locale}${approach.ctaHref}` : approach.ctaHref}
                  className={cn(buttonVariants({ variant: 'link' }), 'pl-0 text-aryes-blue hover:text-aryes-dark font-medium')}
                >
                  {approach.ctaLabel}
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </Section>
      )}

      {/* Leadership Section - Modified: Staggered Layout with Z-index swap and Blue filters */}
      {leadership && leadership.teamMembers && leadership.teamMembers.length > 0 && (
        <section className="bg-aryes-dark py-32 border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Text Content */}
              <div className="flex flex-col h-full justify-center order-2 lg:order-1">
                <RevealOnScroll>
                  <h2 className="text-sm font-bold text-aryes-blue uppercase tracking-widest mb-8">
                    {leadership.label}
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight whitespace-pre-line">
                    {leadership.title}
                  </h3>
                  <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-lg">
                    {leadership.description}
                  </p>

                  <div className="flex flex-col space-y-8">
                    {leadership.teamMembers.map((member) => {
                      const teamMember = member as TeamMember;
                      if (!teamMember) return null;

                      const href = teamMember.href
                        ? teamMember.href.startsWith('/')
                          ? `/${locale}${teamMember.href}`
                          : teamMember.href
                        : `/${locale}/about#${teamMember.slug}`;

                      return (
                        <Link
                          key={teamMember.id}
                          href={href}
                          className="group relative flex items-center justify-between pb-6"
                        >
                          <div>
                            <h4 className="text-2xl font-serif text-white transition-colors">{teamMember.name}</h4>
                            <span className="text-sm text-gray-500 uppercase tracking-wider">{teamMember.role}</span>
                          </div>
                          <ArrowRight className="text-white/20 group-hover:text-aryes-blue transition-colors" />
                          {/* Animated Bottom Border */}
                          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10"></div>
                          <div className="absolute bottom-0 left-0 h-px bg-aryes-blue w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                        </Link>
                      );
                    })}
                  </div>
                </RevealOnScroll>
              </div>

              {/* Imagery Composition */}
              {leadership.teamMembers.length >= 2 && (
                <>
                  <ParallaxTeamImages 
                    teamMembers={leadership.teamMembers.filter((m): m is TeamMember => 
                      typeof m === 'object' && m !== null
                    )} 
                  />
                  {/* Mobile Fallback for Images */}
                  <div className="grid grid-cols-2 gap-4 md:hidden order-1">
                    {leadership.teamMembers.slice(0, 2).map((member, index) => {
                      const teamMember = member as TeamMember;
                      if (!teamMember) return null;
                      const image = teamMember.image as Media;
                      if (!image?.url) return null;

                      return (
                        <div
                          key={teamMember.id}
                          className={`aspect-3/4 relative ${index === 1 ? 'translate-y-8' : ''}`}
                        >
                          <Image
                            src={image.url}
                            alt={image.alt || teamMember.name}
                            fill
                            className="object-cover grayscale z-0"
                          />
                          <div className="absolute inset-0 bg-aryes-blue/20 mix-blend-hard-light z-10"></div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Revised Contact Section */}
      {contact && (
        <section className="py-32 px-6 bg-aryes-stone relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <RevealOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-5xl md:text-7xl font-serif text-aryes-dark mb-6 leading-[1.1]">
                    <RichText data={contact.title} />
                  </h2>
                  <div className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
                    {contact.description}
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end space-y-10">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="group flex items-center gap-4 text-3xl md:text-5xl font-serif text-aryes-dark hover:text-aryes-blue transition-colors"
                    >
                      <span>{contact.email}</span>
                      <ArrowRight className="w-8 h-8 md:w-12 md:h-12 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-aryes-blue" />
                    </a>
                  )}

                  <div className="w-full h-px bg-gray-300"></div>

                  <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-between">
                    {contact.location && (
                      <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-gray-400 uppercase">
                        <div className="w-2 h-2 rounded-full bg-aryes-blue"></div>
                        {contact.location}
                      </div>
                    )}
                    <Link
                      href={contact.ctaHref.startsWith('/') ? `/${locale}${contact.ctaHref}` : contact.ctaHref}
                      className={cn(
                        buttonVariants({ variant: 'default' }),
                        'w-full md:w-auto px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all bg-aryes-blue hover:bg-aryes-blue/90 text-white'
                      )}
                    >
                      {contact.ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}
    </>
  );
}

