import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Upload, Music } from 'lucide-react';

const AudioPlayer = ({ defaultSong, autoPlay, defaultVolume }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [progress, setProgress] = useState(0);
  const [customSong, setCustomSong] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (autoPlay && !customSong) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, [autoPlay, customSong]);

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

  const handleProgress = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
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

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className="glassmorphism rounded-2xl p-4 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </motion.button>

          {/* Progress Bar */}
          <div className="flex-1 min-w-[150px] md:min-w-[300px]">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume === 0 ? defaultVolume : 0)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
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
          <motion.button
            onClick={() => setShowUpload(!showUpload)}
            className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Upload className="w-5 h-5" />
          </motion.button>
        </div>

        {/* File Upload Input */}
        {showUpload && (
          <motion.div
            className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <Music className="w-4 h-4" />
              <span>Upload your own song</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </motion.div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong}
          onTimeUpdate={handleProgress}
          onEnded={() => setIsPlaying(false)}
        />
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
