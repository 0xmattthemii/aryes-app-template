import Image from 'next/image';
import type { Media } from '@/types/payload-types';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  category: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  image?: Media | null;
  withBlueLine?: boolean;
  size?: 'standard' | 'large';
  className?: string;
}

export function PageHeader({
  category,
  title,
  subtitle,
  imageSrc,
  image,
  withBlueLine = false,
  size = 'standard',
  className,
}: PageHeaderProps) {
  const imageUrl = imageSrc || (typeof image === 'object' && image !== null ? image.url : null);

  const heightClasses = {
    large: 'min-h-[70vh]',
    standard: 'min-h-[60vh]',
    compact: 'min-h-[40vh]',
  };

  return (
    <section className={cn('relative flex items-center bg-aryes-dark text-white overflow-hidden grain grain-light', heightClasses[size], className)}>
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="w-full h-full object-cover opacity-40"
            priority
          />
          {/* Dual Gradients matching Home */}
          <div className="absolute inset-0 bg-linear-to-r from-aryes-dark via-aryes-dark/70 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-t from-aryes-dark/90 via-transparent to-aryes-dark/40"></div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10 w-full">
        <div className="max-w-3xl animate-fade-in-up pt-8">
          {category && (
            <div className="text-sm text-aryes-blue mb-6 font-bold uppercase tracking-widest">
              {category}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            {title}
          </h1>
          <p className={cn(
            'text-lg md:text-xl text-gray-300 font-light max-w-2xl',
            withBlueLine ? 'border-l border-aryes-blue pl-6' : ''
          )}>
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

