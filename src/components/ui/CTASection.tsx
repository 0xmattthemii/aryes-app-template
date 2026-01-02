import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from './Section';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  title: React.ReactNode;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  className,
}: CTASectionProps) {
  const isDark = className?.includes('bg-aryes-dark');
  
  return (
    <section className={cn('py-24 relative overflow-hidden', isDark ? 'bg-aryes-dark text-white' : 'bg-aryes-stone', className)}>
      {/* Grain Overlay - only for dark */}
      {isDark && (
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      )}
      
      {/* Blue Blurry Halos - only for dark */}
      {isDark && (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aryes-blue/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aryes-blue/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        <RevealOnScroll>
          <div className={cn(
            'flex flex-col md:flex-row items-center justify-between gap-12',
            !isDark && 'max-w-4xl mx-auto text-center'
          )}>
            <div className={cn('max-w-2xl', !isDark && 'max-w-4xl mx-auto')}>
              <h2 className={cn(
                'text-4xl md:text-5xl font-serif mb-6 leading-tight',
                isDark ? 'text-white' : 'text-aryes-dark'
              )}>
                {title}
              </h2>
              <p className={cn(
                'text-xl font-light leading-relaxed',
                isDark ? 'text-gray-400 mb-0' : 'text-gray-600 mb-10 max-w-2xl mx-auto'
              )}>
                {subtitle}
              </p>
            </div>
            {isDark && (
              <div className="shrink-0">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium transition-all duration-300 rounded-sm bg-aryes-blue text-white hover:bg-blue-700 shadow-xl hover:shadow-aryes-blue/20"
                >
                  {buttonText}
                </Link>
              </div>
            )}
            {!isDark && (
              <Link
                href={buttonLink}
                className="group inline-flex items-center justify-between gap-8 pl-8 pr-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-aryes-blue transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="text-aryes-dark tracking-[0.2em] text-sm font-medium uppercase">
                  {buttonText}
                </span>
                <div className="w-9 h-9 shrink-0 bg-aryes-blue flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-aryes-blue border border-aryes-blue">
                  <ArrowRight
                    size={20}
                    className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-400"
                  />
                </div>
              </Link>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

