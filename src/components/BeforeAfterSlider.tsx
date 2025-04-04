
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AspectRatio } from './ui/aspect-ratio';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: number;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  aspectRatio = 16 / 9
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDown || !slider) return;
      e.preventDefault();
      
      const sliderRect = slider.getBoundingClientRect();
      const x = 'pageX' in e ? e.pageX : (e.touches && e.touches[0].pageX);
      const offsetX = x - sliderRect.left;
      const percentage = Math.max(0, Math.min(100, (offsetX / sliderRect.width) * 100));
      
      const afterElement = slider.querySelector('.after') as HTMLElement;
      const handleElement = slider.querySelector('.slider-handle') as HTMLElement;
      
      if (afterElement) afterElement.style.width = `${percentage}%`;
      if (handleElement) handleElement.style.left = `${percentage}%`;
    };

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      const afterElement = slider.querySelector('.after') as HTMLElement;
      startX = e.pageX;
      scrollLeft = afterElement ? afterElement.offsetWidth : 0;
      slider.style.cursor = 'grabbing';
    };

    const touchStartHandler = (e: TouchEvent) => {
      isDown = true;
      const afterElement = slider.querySelector('.after') as HTMLElement;
      startX = e.touches[0].pageX;
      scrollLeft = afterElement ? afterElement.offsetWidth : 0;
    };

    const mouseUpHandler = () => {
      isDown = false;
      if (slider) slider.style.cursor = 'grab';
    };

    const touchEndHandler = () => {
      isDown = false;
    };

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('touchstart', touchStartHandler as EventListener);
    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchend', touchEndHandler);
    window.addEventListener('mousemove', handleDrag as EventListener);
    window.addEventListener('touchmove', handleDrag as EventListener);

    // Initial position (50%)
    const afterElement = slider.querySelector('.after') as HTMLElement;
    const handleElement = slider.querySelector('.slider-handle') as HTMLElement;
    
    if (afterElement) afterElement.style.width = '50%';
    if (handleElement) handleElement.style.left = '50%';

    return () => {
      slider.removeEventListener('mousedown', mouseDownHandler);
      slider.removeEventListener('touchstart', touchStartHandler as EventListener);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('touchend', touchEndHandler);
      window.removeEventListener('mousemove', handleDrag as EventListener);
      window.removeEventListener('touchmove', handleDrag as EventListener);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
      <AspectRatio ratio={aspectRatio} className="w-full">
        <div
          ref={sliderRef}
          className="comparison-slider relative h-full w-full cursor-grab select-none overflow-hidden"
        >
          {/* Before image (background) */}
          <div className="before absolute inset-0 h-full w-full">
            <img
              src={beforeImage}
              alt="Before"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 text-sm font-medium text-white rounded-md">
              {beforeLabel}
            </div>
          </div>

          {/* After image (foreground with adjustable width) */}
          <div className="after absolute inset-0 h-full w-1/2 overflow-hidden">
            <img
              src={afterImage}
              alt="After"
              className="h-full w-[calc(100%_*_2)] max-w-none object-cover"
              style={{ objectPosition: "left center" }}
            />
            <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 text-sm font-medium text-white rounded-md">
              {afterLabel}
            </div>
          </div>

          {/* Slider handle */}
          <div className="slider-handle absolute top-0 bottom-0 left-1/2 z-10 h-full w-1 -translate-x-1/2 bg-white">
            <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-lg">
              <div className="flex h-full items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8L6 12L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 8L18 12L14 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default BeforeAfterSlider;
