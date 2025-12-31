'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const pageLoadedRef = useRef<boolean>(false);
  const exitScheduledRef = useRef<boolean>(false);
  
  // Memoize the animation element to prevent re-creation on re-renders
  const animationElement = useMemo(
    () => (
      <div className="absolute inset-0 bg-aryes-blue animate-loading-cycle origin-left will-change-transform backface-hidden transform-[translateZ(0)]" />
    ),
    []
  );

  useEffect(() => {
    // Animation sequence: fill (0.6s) + 2 pulses (0.8s) = 1.4s per cycle
    // Minimum 1 cycle = 1.4s
    const cycleDuration = 1400; // 1.4 seconds per cycle
    const minCycles = 0;
    const minDisplayTime = cycleDuration * minCycles; // 1.4 seconds minimum
    const slideOutDuration = 600; // Slide-out animation duration

    const scheduleExit = () => {
      if (exitScheduledRef.current) return;
      exitScheduledRef.current = true;
      
      // Start slide-out transition
      setIsExiting(true);
      
      // Remove from DOM after slide-out completes
      // Animation continues running during slide-out
      setTimeout(() => {
        setIsLoading(false);
      }, slideOutDuration);
    };

    const checkAndScheduleExit = () => {
      if (!pageLoadedRef.current) return;
      
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      if (remainingTime === 0) {
        // Minimum time has passed, exit immediately
        scheduleExit();
      } else {
        // Wait for remaining time, then exit
        // Animation will continue looping during this wait and during slide-out
        setTimeout(() => {
          scheduleExit();
        }, remainingTime);
      }
    };

    const handleLoad = () => {
      pageLoadedRef.current = true;
      checkAndScheduleExit();
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 bg-aryes-dark flex items-center justify-center transition-transform duration-600 ease-out-expo ${
        isExiting ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="relative">
        {/* Blue underscore with ratio 2.95219512195 (width/height) */}
        {/* Using height of 12px, width = 12 * 2.95219512195 = ~35.43px */}
        <div className="relative overflow-hidden w-[35.43px] h-3">
          {/* Animated underscore bar - animation loops infinitely until component unmounts */}
          {/* Animation continues even during slide-out transition */}
          {animationElement}
        </div>
      </div>
    </div>
  );
}

