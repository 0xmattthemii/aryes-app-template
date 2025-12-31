'use client';

import { useEffect, useState, useRef } from 'react';

interface UseParallaxOptions {
  speed?: number; // Parallax speed multiplier (0.1 = slow, 0.5 = medium, 1 = fast)
  offset?: number; // Initial offset
  enabled?: boolean; // Enable/disable parallax
}

/**
 * Custom hook for parallax scroll effects
 * Creates a parallax effect where the element moves slower than the scroll speed
 * @param options Configuration options for parallax behavior
 * @returns The current transform value as a CSS transform string
 */
export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, offset = 0, enabled = true } = options;
  const [transform, setTransform] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setTransform(0);
      return;
    }

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Calculate parallax transform
        // As user scrolls down, element moves slower (creating depth effect)
        // Positive speed moves element down as scroll increases
        // Negative speed moves element up as scroll increases
        const parallaxValue = scrollY * speed + offset;
        
        setTransform(parallaxValue);
      });
    };

    // Throttle scroll events using requestAnimationFrame
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, offset, enabled]);

  return {
    transform: `translateY(${transform}px)`,
  };
}

