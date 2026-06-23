import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Sun, Moon } from 'iconsax-react';

const ThemeToggle = ({ darkMode, onToggle }) => {
  const toggleRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    anime({
      targets: toggleRef.current,
      translateX: [50, 0],
      opacity: [0, 1],
      duration: 500,
      delay: 500,
      easing: 'easeOutQuad',
    });
  }, []);

  useEffect(() => {
    anime({
      targets: iconRef.current,
      rotate: darkMode ? 180 : 0,
      duration: 300,
      easing: 'easeOutQuad',
    });
  }, [darkMode]);

  return (
    <button
      ref={toggleRef}
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 glassmorphism rounded-full shadow-lg hover:shadow-xl transition-all"
      style={{ opacity: 0 }}
    >
      <div ref={iconRef}>
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" variant="Bold" />
        ) : (
          <Moon className="w-6 h-6 text-purple-600" variant="Bold" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
