import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';

const FloatingWishes = () => {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const addWish = () => {
      const randomWish = config.wishes[Math.floor(Math.random() * config.wishes.length)];
      const newWish = {
        id: Date.now(),
        text: randomWish,
        x: Math.random() * 80 + 10,
        duration: Math.random() * 5 + 5,
      };
      setWishes((prev) => [...prev, newWish]);

      // Remove wish after animation
      setTimeout(() => {
        setWishes((prev) => prev.filter((w) => w.id !== newWish.id));
      }, newWish.duration * 1000);
    };

    // Add wishes periodically
    const interval = setInterval(addWish, 3000);
    addWish(); // Add first wish immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      <AnimatePresence>
        {wishes.map((wish) => (
          <motion.div
            key={wish.id}
            className="absolute text-2xl md:text-3xl font-bold text-primary opacity-70 whitespace-nowrap"
            style={{
              left: `${wish.x}%`,
            }}
            initial={{ y: '100vh', opacity: 0, rotate: -10 }}
            animate={{
              y: '-100px',
              opacity: [0, 0.7, 0],
              rotate: [-10, 10, -10],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: wish.duration,
              ease: 'easeOut',
            }}
          >
            {wish.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingWishes;
