
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RegionPage from "./pages/RegionPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useEffect(() => {
    // Add intersection observer for animations
    const setupIntersectionObserver = () => {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
            }
          });
        },
        { threshold: 0.1 }
      );

      // Add smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });

      // Initialize comparison sliders
      const sliders = document.querySelectorAll('.comparison-slider');
      sliders.forEach(slider => {
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleDrag = (e: MouseEvent | TouchEvent) => {
          if (!isDown) return;
          e.preventDefault();
          
          const x = 'pageX' in e ? e.pageX : (e.touches && e.touches[0].pageX);
          const walk = (x - startX);
          const sliderWidth = (slider as HTMLElement).offsetWidth;
          const percentage = Math.max(0, Math.min(100, (scrollLeft + walk) / sliderWidth * 100));
          
          const afterElement = slider.querySelector('.after') as HTMLElement;
          const handleElement = slider.querySelector('.slider-handle') as HTMLElement;
          
          if (afterElement) afterElement.style.width = `${percentage}%`;
          if (handleElement) handleElement.style.left = `${percentage}%`;
        };

        slider.addEventListener('mousedown', (e: MouseEvent) => {
          isDown = true;
          startX = e.pageX;
          scrollLeft = (slider.querySelector('.after') as HTMLElement).offsetWidth;
        });

        slider.addEventListener('touchstart', (e: TouchEvent) => {
          isDown = true;
          startX = e.touches[0].pageX;
          scrollLeft = (slider.querySelector('.after') as HTMLElement).offsetWidth;
        });

        window.addEventListener('mouseup', () => {
          isDown = false;
        });

        window.addEventListener('touchend', () => {
          isDown = false;
        });

        window.addEventListener('mousemove', handleDrag as EventListener);
        window.addEventListener('touchmove', handleDrag as EventListener);
      });
    };

    // Setup animations and interactive elements after the content is loaded
    window.addEventListener('load', setupIntersectionObserver);
    
    return () => {
      window.removeEventListener('load', setupIntersectionObserver);
    };
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/region/:regionId" element={<RegionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
