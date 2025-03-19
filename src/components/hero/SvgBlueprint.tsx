
import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// SVG paths for the room outlines - detailed and realistic
const svgPaths = {
  // Modern bathroom with bathtub, shower, sink and toilet
  bathroom: `
    M20,20 L280,20 L280,280 L20,280 Z
    
    // Bathtub
    M40,40 L140,40 L140,100 L40,100 Z
    
    // Shower
    M200,40 L260,40 L260,100 L200,100 Z
    M200,40 C230,70 230,70 260,100
    
    // Toilet
    M40,140 L80,140 L80,180 L40,180 Z
    M50,180 a15,10 0 1,0 20,0
    
    // Sink with cabinet
    M180,140 L260,140 L260,180 L180,180 Z
    M200,140 L200,180
    M220,140 L220,180
    M240,140 L240,180
    
    // Door
    M150,280 L150,250 L200,280
  `,
  
  // Detailed kitchen with island, counters, appliances
  kitchen: `
    M20,20 L280,20 L280,280 L20,280 Z
    
    // Kitchen island
    M90,120 L210,120 L210,180 L90,180 Z
    
    // Lower cabinets and countertop
    M20,220 L280,220 L280,250 L20,250 Z
    
    // Upper cabinets
    M20,60 L120,60 L120,100 L20,100 Z
    M160,60 L280,60 L280,100 L160,100 Z
    
    // Refrigerator
    M20,110 L60,110 L60,210 L20,210 Z
    
    // Oven and stove
    M130,220 L180,220
    M130,235 C138,228 142,228 150,235
    M160,235 C168,228 172,228 180,235
    
    // Sink
    M220,220 L260,220
    M240,235 a15,5 0 1,0 1,0
    
    // Door
    M150,280 L150,250 L200,280
  `,
  
  // Living room with sofa, coffee table, TV, bookshelf
  livingroom: `
    M20,20 L380,20 L380,280 L20,280 Z
    
    // Sofa
    M40,180 L160,180 L160,250 L40,250 Z
    M40,180 C60,160 140,160 160,180
    
    // Coffee table
    M180,200 L240,200 L240,230 L180,230 Z
    
    // TV stand and TV
    M270,40 L350,40 L350,100 L270,100 Z
    M290,40 L330,40 L330,70 L290,70 Z
    
    // Bookshelf
    M40,40 L100,40 L100,140 L40,140 Z
    M50,40 L50,140
    M60,40 L60,140
    M70,40 L70,140
    M80,40 L80,140
    M90,40 L90,140
    M40,60 L100,60
    M40,80 L100,80
    M40,100 L100,100
    M40,120 L100,120
    
    // Carpet
    M120,120 a70,50 0 1,0 140,0 a70,50 0 1,0 -140,0
    
    // Window
    M180,20 L280,20
    M180,21 L180,30
    M230,21 L230,30
    M280,21 L280,30
    
    // Door
    M20,180 L20,230 L40,200
  `
};

const SvgBlueprint = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const controls = useAnimationControls();
  const [currentDrawingIndex, setCurrentDrawingIndex] = useState(0);

  useEffect(() => {
    // Setup continuous animation for the drawings
    const setupDrawingAnimation = async () => {
      await controls.start({
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", duration: 3.5, bounce: 0 },
          opacity: { duration: 0.8 }
        }
      });
      
      // After drawing is complete, change to next drawing and restart animation
      setTimeout(() => {
        setCurrentDrawingIndex((prevIndex) => (prevIndex + 1) % Object.keys(svgPaths).length);
        controls.set({ pathLength: 0, opacity: 0.3 });
        setupDrawingAnimation();
      }, 1500);
    };

    setupDrawingAnimation();
  }, [controls]);

  // Get the current path for the drawing animation
  const getCurrentDrawingPath = () => {
    const paths = Object.values(svgPaths);
    return paths[currentDrawingIndex];
  };

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%" 
        viewBox="0 0 400 300" 
        preserveAspectRatio="xMidYMid meet"
        className="opacity-30"
      >
        <motion.path
          d={getCurrentDrawingPath()}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={controls}
          key={currentDrawingIndex}
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SvgBlueprint;
