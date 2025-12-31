'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Media, TeamMember } from '@/types/payload-types';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

interface ParallaxTeamImagesProps {
  teamMembers: TeamMember[];
}

export function ParallaxTeamImages({ teamMembers }: ParallaxTeamImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transforms, setTransforms] = useState<{ first: number; second: number }>({ first: 0, second: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const elementBottom = elementTop + elementHeight;

        // Calculate center points
        const viewportCenter = windowHeight / 2;
        const elementCenter = elementTop + elementHeight / 2;

        // Calculate distance from viewport center to element center
        // When element is centered, distanceFromCenter = 0
        // When element is above center, distanceFromCenter is negative
        // When element is below center, distanceFromCenter is positive
        const distanceFromCenter = elementCenter - viewportCenter;

        // Only apply parallax when element is in or near viewport
        if (elementBottom < 0 || elementTop > windowHeight) {
          setTransforms({ first: 0, second: 0 });
          return;
        }

        // Apply different parallax speeds to each image for depth effect
        // Positive distanceFromCenter (element below center) = move images down slightly
        // Negative distanceFromCenter (element above center) = move images up slightly
        const firstSpeed = 0.05; // Subtle movement
        const secondSpeed = 0.1; // Slightly more movement

        // Transform is 0 when element is centered, increases/decreases as it moves away
        const firstTransform = distanceFromCenter * firstSpeed;
        const secondTransform = distanceFromCenter * secondSpeed;

        setTransforms({ first: firstTransform, second: secondTransform });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (teamMembers.length < 2) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative h-[700px] w-full order-1 lg:order-2 hidden md:block">
      <RevealOnScroll delay={100} className="h-full">
        {teamMembers.slice(0, 2).map((member, index) => {
          const teamMember = member as TeamMember;
          if (!teamMember) return null;
          const image = teamMember.image as Media;
          if (!image?.url) return null;

          const isFirst = index === 0;
          const transform = isFirst ? transforms.first : transforms.second;

          return (
            <div
              key={teamMember.id}
              className={`absolute ${isFirst ? 'top-0 left-0' : 'bottom-0 right-0'} w-[52%] aspect-3/4 ${
                isFirst ? 'z-10' : 'z-20'
              } shadow-2xl group`}
              style={{
                transform: `translateY(${transform}px)`,
              }}
            >
              <Image
                src={image.url}
                alt={image.alt || teamMember.name}
                fill
                className="object-cover filter grayscale z-0"
              />
              <div
                className={`absolute inset-0 ${
                  isFirst ? 'bg-aryes-blue/20' : 'bg-aryes-blue/15'
                } mix-blend-hard-light z-10`}
              ></div>
            </div>
          );
        })}
      </RevealOnScroll>
    </div>
  );
}

