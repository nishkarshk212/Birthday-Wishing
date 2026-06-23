import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Play, Pause, Volume2, VolumeX, Upload, Music } from 'lucide-react';

const AudioPlayer = ({ defaultSong, autoPlay, defaultVolume, shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [customSong, setCustomSong] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomSong(url);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
    }
  };

  const currentSong = customSong || defaultSong;

  useEffect(() => {
    anime({
      targets: '.audio-player',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 500,
      delay: 1000,
      easing: 'easeOutQuad',
    });
  }, []);

  const handlePlayBtnHover = () => {
    anime({
      targets: '.play-btn',
      scale: 1.1,
      duration: 200,
      easing: 'easeOutQuad',
    });
  };

  const handlePlayBtnLeave = () => {
    anime({
      targets: '.play-btn',
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad',
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glassmorphism rounded-2xl p-4 shadow-2xl audio-player" style={{ opacity: 0 }}>
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            onMouseEnter={handlePlayBtnHover}
            onMouseLeave={handlePlayBtnLeave}
            className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all play-btn"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume === 0 ? defaultVolume : 0)}
              className="text-gray-300 hover:text-primary transition-colors"
            >
              {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="text-gray-300 hover:text-primary transition-colors"
          >
            <Upload className="w-5 h-5" />
          </button>
        </div>

        {/* File Upload Input */}
        {showUpload && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 hover:text-primary transition-colors">
              <Music className="w-4 h-4" />
              <span>Upload your own song</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
