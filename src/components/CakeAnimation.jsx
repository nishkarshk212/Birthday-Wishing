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
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
          Time to Cut the Cake! 🎂
        </h2>
        <p className="text-gray-300 mb-8 md:mb-12 text-sm md:text-base">
          Make a wish and blow out the candles!
        </p>

        <div className="relative h-64 md:h-80 flex items-end justify-center">
          {/* Cake Base */}
          <div className="relative" ref={cakeRef}>
            {/* Cake Layers */}
            <div className="relative">
              {/* Bottom Layer */}
              <div className="w-40 md:w-48 lg:w-56 h-16 md:h-20 lg:h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-b-3xl relative cake-bottom shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-4 md:h-6 bg-amber-300 rounded-t-lg" />
                {/* Decorative elements */}
                <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6 w-3 md:w-4 h-3 md:h-4 bg-red-500 rounded-full shadow-md" />
                <div className="absolute bottom-3 md:bottom-4 right-6 md:right-8 w-3 md:w-4 h-3 md:h-4 bg-green-500 rounded-full shadow-md" />
                <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-3 md:w-4 h-3 md:h-4 bg-blue-500 rounded-full shadow-md" />
              </div>

              {/* Middle Layer */}
              <div className="w-32 md:w-40 lg:w-48 h-14 md:h-16 lg:h-20 bg-gradient-to-r from-pink-400 to-pink-600 rounded-b-2xl relative mx-auto -mt-2 md:-mt-3 cake-middle shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-3 md:h-4 bg-pink-300 rounded-t-lg" />
                {/* Decorative elements */}
                <div className="absolute bottom-2 md:bottom-3 left-3 md:left-4 w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-full shadow-md" />
                <div className="absolute bottom-2 md:bottom-3 right-3 md:right-4 w-2 md:w-3 h-2 md:h-3 bg-purple-400 rounded-full shadow-md" />
              </div>

              {/* Top Layer */}
              <div className="w-28 md:w-32 lg:w-40 h-12 md:h-14 lg:h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-b-xl relative mx-auto -mt-2 md:-mt-3 cake-top shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-2 md:h-3 bg-purple-300 rounded-t-lg" />
                {/* Cherry on top */}
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-5 md:w-6 h-5 md:h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg" />
                  <div className="absolute -top-1 md:-top-2 left-1/2 transform -translate-x-1/2 w-0.5 md:w-1 h-2 md:h-3 bg-green-600 rounded-t-full" />
                </div>
              </div>

              {/* Candles */}
              <div className="absolute -top-8 md:-top-10 lg:-top-12 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    ref={(el) => (candleRefs.current[i] = el)}
                    className="relative"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-2 md:w-3 h-6 md:h-8 lg:h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-t-sm shadow-md" />
                    {lit && (
                      <div className="absolute -top-3 md:-top-4 lg:-top-5 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 md:w-4 h-4 md:h-5 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-pulse-glow shadow-lg" />
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-5 md:h-7 bg-gradient-to-t from-orange-300 to-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Frosting drips */}
              <div className="absolute top-0 left-4 md:left-6 w-3 md:w-4 h-6 md:h-8 bg-amber-300 rounded-b-full shadow-md" />
              <div className="absolute top-0 right-6 md:right-8 w-3 md:w-4 h-8 md:h-10 bg-amber-300 rounded-b-full shadow-md" />
              <div className="absolute top-0 left-1/2 w-3 md:w-4 h-5 md:h-7 bg-amber-300 rounded-b-full shadow-md" />
              
              {/* Sprinkles */}
              <div className="absolute top-2 left-10 w-2 h-2 bg-white rotate-45 rounded-sm" />
              <div className="absolute top-4 right-12 w-2 h-2 bg-yellow-300 rotate-12 rounded-sm" />
              <div className="absolute top-3 left-1/3 w-2 h-2 bg-pink-300 -rotate-12 rounded-sm" />
            </div>
            
            {/* Cake plate */}
            <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-48 md:w-56 lg:w-64 h-3 md:h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full shadow-xl" />
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
