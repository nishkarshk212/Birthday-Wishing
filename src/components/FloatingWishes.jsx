import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import { config } from '../config';

const FloatingWishes = () => {
  const [wishes, setWishes] = useState([]);
  const wishRefs = useRef({});

  useEffect(() => {
    const addWish = () => {
      const randomWish = config.wishes[Math.floor(Math.random() * config.wishes.length)];
      const id = Date.now();
      const newWish = {
        id,
        text: randomWish,
        x: Math.random() * 80 + 10,
        duration: Math.random() * 5 + 5,
      };
      setWishes((prev) => [...prev, newWish]);

      // Animate the wish with anime.js
      setTimeout(() => {
        if (wishRefs.current[id]) {
          anime({
            targets: wishRefs.current[id],
            translateY: ['-100vh', '-100px'],
            opacity: [0, 0.7, 0],
            rotate: [-10, 10, -10],
            duration: newWish.duration * 1000,
            easing: 'easeOutQuad',
          });
        }
      }, 100);

      // Remove wish after animation
      setTimeout(() => {
        setWishes((prev) => prev.filter((w) => w.id !== id));
        delete wishRefs.current[id];
      }, newWish.duration * 1000);
    };

    // Add wishes periodically
    const interval = setInterval(addWish, 3000);
    addWish(); // Add first wish immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {wishes.map((wish) => (
        <div
          key={wish.id}
          ref={(el) => (wishRefs.current[wish.id] = el)}
          className="absolute text-2xl md:text-3xl font-bold text-primary opacity-70 whitespace-nowrap"
          style={{
            left: `${wish.x}%`,
            top: '100vh',
          }}
        >
          {wish.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingWishes;
