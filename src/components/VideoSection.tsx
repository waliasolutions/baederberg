import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-6 md:px-12">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 font-inter">
              So arbeiten wir
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Erfahren Sie mehr über unsere Arbeitsweise und warum Kunden uns ihr Vertrauen schenken
            </p>
          </div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
            initial={{ opacity: 0, scale: 0.95 }}
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
                  src="https://www.baederberg.ch/wp-content/uploads/2022/06/Erklaerungsvideo_Baederber_web.mp4"
                  type="video/mp4"
                />
                Ihr Browser unterstützt das Video-Tag nicht.
              </video>

              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isPlaying ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              Von der Planung bis zur Fertigstellung – alles aus einer Hand
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
