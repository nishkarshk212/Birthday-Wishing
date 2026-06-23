import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CakeAnimation = () => {
  const [cut, setCut] = useState(false);
  const [lit, setLit] = useState(true);

  const handleCut = () => {
    setCut(true);
    setLit(false);
    
    // Trigger confetti explosion
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF6B9D', '#FFD93D', '#6BCB77', '#4D96FF', '#C44569'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B9D', '#FFD93D'],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6BCB77', '#4D96FF'],
      });
    }, 300);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Time to Cut the Cake! 🎂
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Make a wish and blow out the candles!
        </p>

        <div className="relative h-64 flex items-end justify-center">
          {/* Cake Base */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Cake Layers */}
            <div className="relative">
              {/* Bottom Layer */}
              <motion.div
                className="w-48 h-20 bg-gradient-to-r from-pink-400 to-pink-500 rounded-b-3xl relative"
                animate={cut ? { x: -10, rotate: -5 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-pink-300 rounded-t-lg" />
              </motion.div>

              {/* Middle Layer */}
              <motion.div
                className="w-40 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-b-2xl relative mx-auto -mt-2"
                animate={cut ? { x: 10, rotate: 5 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-3 bg-purple-300 rounded-t-lg" />
              </motion.div>

              {/* Top Layer */}
              <motion.div
                className="w-32 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-b-xl relative mx-auto -mt-2"
                animate={cut ? { y: 20 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-300 rounded-t-lg" />
              </motion.div>

              {/* Candles */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-2 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-t-sm" />
                    <AnimatePresence>
                      {lit && (
                        <motion.div
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <div className="w-3 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-pulse-glow" />
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-orange-300 to-transparent rounded-full" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Frosting drips */}
              <div className="absolute top-0 left-4 w-3 h-6 bg-pink-300 rounded-b-full" />
              <div className="absolute top-0 right-6 w-3 h-8 bg-pink-300 rounded-b-full" />
              <div className="absolute top-0 left-1/2 w-3 h-5 bg-pink-300 rounded-b-full" />
            </div>
          </motion.div>

          {/* Sparkles */}
          <AnimatePresence>
            {cut && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  >
                    ✨
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleCut}
          disabled={cut}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: cut ? 1 : 1.05 }}
          whileTap={{ scale: cut ? 1 : 0.95 }}
        >
          {cut ? '🎉 Happy Birthday! 🎉' : 'Cut the Cake!'}
        </motion.button>
      </div>
    </section>
  );
};

export default CakeAnimation;
