import React, { useState, useEffect } from 'react';
import { config } from './config';
import Background from './components/Background';
import Hero from './components/Hero';
import AudioPlayer from './components/AudioPlayer';
import PhotoGallery from './components/PhotoGallery';
import BirthdayCard from './components/BirthdayCard';
import CakeAnimation from './components/CakeAnimation';
import ThemeToggle from './components/ThemeToggle';
import SocialShare from './components/SocialShare';
import FloatingWishes from './components/FloatingWishes';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', darkMode ? 'light' : 'dark');
  };

  const handleCelebrate = () => {
    setCelebrating(true);
    setShowCake(true);
    setShouldPlayMusic(true);
    
    // Trigger confetti
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti({
        particleCount: config.animations.confettiCount,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    setTimeout(() => setCelebrating(false), 3000);
  };

  return (
    <div className={`min-h-screen relative ${darkMode ? 'dark' : ''}`}>
      <Background />
      <FloatingWishes />
      
      <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
      
      <main className="relative z-10">
        <Hero 
          name={config.birthdayPerson.name}
          message={config.birthdayPerson.message}
          birthdayDate={config.birthdayPerson.birthdayDate}
          onCelebrate={handleCelebrate}
          celebrating={celebrating}
        />
        
        <BirthdayCard />
        
        {showCake && <CakeAnimation />}
        
        <PhotoGallery images={config.galleryImages} />
        
        <SocialShare links={config.socialLinks} />
      </main>
      
      <AudioPlayer 
        defaultSong={config.music.defaultSong}
        autoPlay={config.music.autoPlay}
        defaultVolume={config.music.volume}
        shouldPlay={shouldPlayMusic}
      />
    </div>
  );
}

export default App;
