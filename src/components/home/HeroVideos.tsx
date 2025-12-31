'use client';

import { useState, useEffect, useRef } from 'react';
import type { Media } from '@/types/payload-types';
import { useParallax } from '@/lib/useParallax';

interface HeroVideosProps {
  videos: Array<{ video: Media; id?: string | null }>;
}

const MAX_VIDEO_DURATION = 15; // seconds

export function HeroVideos({ videos }: HeroVideosProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Parallax: video moves slower than scroll (positive speed = moves down with scroll)
  const { transform } = useParallax({ speed: 0.2, enabled: true });

  // Initialize video refs array when videos change
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  // Handle video playback and switching
  useEffect(() => {
    if (videos.length === 0) return;

    const currentVideo = videoRefs.current[currentVideoIndex];
    if (!currentVideo) return;

    // Reset and play current video
    const playCurrentVideo = () => {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(console.error);
    };

    const switchToNextVideo = () => {
      // Pause current video
      currentVideo.pause();
      
      // Switch to next video
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(nextIndex);
    };

    const handleTimeUpdate = () => {
      const elapsed = currentVideo.currentTime;
      
      // Check if 7 seconds have passed
      if (elapsed >= MAX_VIDEO_DURATION) {
        switchToNextVideo();
      }
    };

    const handleEnded = () => {
      // Video ended naturally, switch to next
      switchToNextVideo();
    };

    // Set up event listeners
    currentVideo.addEventListener('timeupdate', handleTimeUpdate);
    currentVideo.addEventListener('ended', handleEnded);

    // Start playing the current video
    playCurrentVideo();

    // Cleanup function
    return () => {
      currentVideo.removeEventListener('timeupdate', handleTimeUpdate);
      currentVideo.removeEventListener('ended', handleEnded);
    };
  }, [currentVideoIndex, videos.length]);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div 
      className="absolute inset-0 z-0 bg-aryes-dark overflow-hidden"
      style={{ transform }}
    >
      {videos.map((item, index) => {
        const video = typeof item.video === 'object' ? item.video : null;
        if (!video?.url) return null;

        return (
          <video
            key={item.id || index}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideoIndex ? 'opacity-50' : 'opacity-0'
            }`}
            style={{ 
              transform: 'scale(1.1)', // Slight scale to prevent edges showing during parallax
            }}
          >
            <source src={video.url} type={video.mimeType || 'video/mp4'} />
          </video>
        );
      })}

      {/* Gradients */}
      <div className="absolute inset-0 bg-linear-to-r from-aryes-dark via-aryes-dark/70 to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-t from-aryes-dark/90 via-transparent to-aryes-dark/40"></div>
    </div>
  );
}


