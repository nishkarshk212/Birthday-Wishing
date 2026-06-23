import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Sparkles, Timer } from 'lucide-react';

const Hero = ({ name, message, birthdayDate, onCelebrate, celebrating }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const heroRef = useRef(null);
  const sparkleRef = useRef(null);
  const celebrateBtnRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const birthday = new Date(birthdayDate);
      const now = new Date();
      const difference = birthday - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  useEffect(() => {
    // Animate hero section on mount
    if (heroRef.current) {
      anime({
        targets: heroRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutQuad',
      });
    }

    // Animate sparkle icon
    if (sparkleRef.current) {
      anime({
        targets: sparkleRef.current,
        rotate: [0, 10, -10, 0],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine',
      });
    }
  }, []);

  useEffect(() => {
    if (celebrating && celebrateBtnRef.current) {
      anime({
        targets: celebrateBtnRef.current,
        scale: [1, 1.1, 1],
        duration: 300,
        loop: 3,
        easing: 'easeInOutQuad',
      });
    }
  }, [celebrating]);

  const handleBtnHover = () => {
    anime({
      targets: celebrateBtnRef.current,
      scale: 1.05,
      duration: 200,
      easing: 'easeOutQuad',
    });
  };

  const handleBtnLeave = () => {
    anime({
      targets: celebrateBtnRef.current,
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad',
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center" ref={heroRef}>
        <div className="flex justify-center mb-6" ref={sparkleRef}>
          <Sparkles className="w-16 h-16 text-yellow-400" />
        </div>

        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Happy Birthday!
        </h1>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
          {name} 🎂
        </h2>

        <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
          {message}
        </p>

        {/* Countdown Timer */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 mb-4 text-gray-300">
            <Timer className="w-5 h-5" />
            <span className="font-semibold">Countdown to the big day!</span>
          </div>
          <div className="flex justify-center gap-2 md:gap-4 lg:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div 
                key={item.label} 
                className="glassmorphism rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 min-w-[60px] md:min-w-[80px] lg:min-w-[100px] countdown-card"
                style={{ opacity: 0 }}
              >
                <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm lg:text-sm text-gray-300 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Celebrate Button */}
        <button
          ref={celebrateBtnRef}
          onClick={onCelebrate}
          onMouseEnter={handleBtnHover}
          onMouseLeave={handleBtnLeave}
          className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-pink-600 text-white font-bold text-base md:text-lg lg:text-xl rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 md:w-6 h-6" />
            {celebrating ? '🎉 Celebrating! 🎉' : 'Celebrate!'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
