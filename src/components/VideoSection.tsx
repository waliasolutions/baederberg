import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-6 md:px-12">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 font-inter">
              So arbeiten wir
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Erfahren Sie mehr über unsere Arbeitsweise und warum Kunden uns ihr Vertrauen schenken
            </p>
          </div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl bg-black max-w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                preload="metadata"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23000'/%3E%3C/svg%3E"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source
                  src="/videos/erklaerungsvideo.mp4"
                  type="video/mp4"
                />
                Ihr Browser unterstützt das Video-Tag nicht.
              </video>

              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity duration-300"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Von der Planung bis zur Fertigstellung – alles aus einer Hand
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
