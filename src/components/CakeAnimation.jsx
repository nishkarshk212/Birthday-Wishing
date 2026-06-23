import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import confetti from 'canvas-confetti';

const CakeAnimation = () => {
  const [cut, setCut] = useState(false);
  const [lit, setLit] = useState(true);
  const cakeRef = useRef(null);
  const candleRefs = useRef([]);
  const sparkleRefs = useRef([]);

  useEffect(() => {
    if (cakeRef.current) {
      anime({
        targets: cakeRef.current,
        scale: [0, 1],
        duration: 800,
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    candleRefs.current.forEach((candle, i) => {
      anime({
        targets: candle,
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: i * 100,
        duration: 500,
        easing: 'easeOutQuad',
      });
    });
  }, []);

  const handleCut = () => {
    setCut(true);
    setLit(false);
    
    // Animate cake layers with anime.js
    anime({
      targets: '.cake-bottom',
      translateX: -10,
      rotate: -5,
      duration: 500,
      easing: 'easeOutQuad',
    });
    anime({
      targets: '.cake-middle',
      translateX: 10,
      rotate: 5,
      duration: 500,
      easing: 'easeOutQuad',
    });
    anime({
      targets: '.cake-top',
      translateY: 20,
      duration: 500,
      easing: 'easeOutQuad',
    });

    // Animate sparkles
    sparkleRefs.current.forEach((sparkle, i) => {
      anime({
        targets: sparkle,
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
        delay: i * 50,
        duration: 1000,
        easing: 'easeOutQuad',
      });
    });
    
    // Trigger confetti explosion
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFFFFF'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF6B6B'],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4ECDC4', '#FFFFFF'],
      });
    }, 300);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          Time to Cut the Cake! 🎂
        </h2>
        <p className="text-gray-300 mb-12">
          Make a wish and blow out the candles!
        </p>

        <div className="relative h-64 flex items-end justify-center">
          {/* Cake Base */}
          <div className="relative" ref={cakeRef}>
            {/* Cake Layers */}
            <div className="relative">
              {/* Bottom Layer */}
              <div className="w-48 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-b-3xl relative cake-bottom">
                <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-300 rounded-t-lg" />
              </div>

              {/* Middle Layer */}
              <div className="w-40 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-b-2xl relative mx-auto -mt-2 cake-middle">
                <div className="absolute top-0 left-0 right-0 h-3 bg-pink-300 rounded-t-lg" />
              </div>

              {/* Top Layer */}
              <div className="w-32 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-b-xl relative mx-auto -mt-2 cake-top">
                <div className="absolute top-0 left-0 right-0 h-2 bg-purple-300 rounded-t-lg" />
              </div>

              {/* Candles */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    ref={(el) => (candleRefs.current[i] = el)}
                    className="relative"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-2 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-t-sm" />
                    {lit && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-pulse-glow" />
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-orange-300 to-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Frosting drips */}
              <div className="absolute top-0 left-4 w-3 h-6 bg-yellow-300 rounded-b-full" />
              <div className="absolute top-0 right-6 w-3 h-8 bg-yellow-300 rounded-b-full" />
              <div className="absolute top-0 left-1/2 w-3 h-5 bg-yellow-300 rounded-b-full" />
            </div>
          </div>

          {/* Sparkles */}
          {cut && (
            <>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (sparkleRefs.current[i] = el)}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  ✨
                </div>
              ))}
            </>
          )}
        </div>

        <button
          onClick={handleCut}
          disabled={cut}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-500 to-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cut ? '🎉 Happy Birthday! 🎉' : 'Cut the Cake!'}
        </button>
      </div>
    </section>
  );
};

export default CakeAnimation;
