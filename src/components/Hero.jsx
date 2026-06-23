import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PartyPopper, Clock } from 'lucide-react';

const Hero = ({ name, message, birthdayDate, onCelebrate, celebrating }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </motion.div>

          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-pulse-glow">
            Happy Birthday!
          </h1>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {name} 🎂
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {message}
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Countdown to the big day!</span>
            </div>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="glassmorphism rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                  <div className="text-3xl md:text-5xl font-bold text-primary">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Celebrate Button */}
          <motion.button
            onClick={onCelebrate}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg md:text-xl rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={celebrating ? { scale: [1, 1.1, 1] } : {}}
            transition={celebrating ? { duration: 0.3, repeat: 3 } : {}}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <PartyPopper className="w-6 h-6" />
              {celebrating ? '🎉 Celebrating! 🎉' : 'Celebrate!'}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
