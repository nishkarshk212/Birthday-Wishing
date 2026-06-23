import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

const Background = () => {
  const [particles, setParticles] = useState([]);
  const [balloons, setBalloons] = useState([]);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create particles
    const newParticles = Array.from({ length: config.animations.particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Create balloons
    const newBalloons = Array.from({ length: config.animations.balloonCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 30 + 40,
      color: ['#FF6B9D', '#C44569', '#FFD93D', '#6BCB77', '#4D96FF'][Math.floor(Math.random() * 5)],
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
    }));
    setBalloons(newBalloons);

    // Create hearts
    const newHearts = Array.from({ length: config.animations.heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 dark:from-purple-900 dark:via-pink-900 dark:to-indigo-900 opacity-50" />
      
      {/* Glowing particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white dark:bg-yellow-200 opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}%`,
          }}
          animate={{
            y: [balloon.y, -20],
            x: [balloon.x, balloon.x + (Math.random() - 0.5) * 10],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="relative"
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
            }}
          >
            <div
              className="absolute rounded-full opacity-80"
              style={{
                width: balloon.size,
                height: balloon.size,
                backgroundColor: balloon.color,
                boxShadow: `0 0 20px ${balloon.color}`,
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400 opacity-50"
              style={{ height: balloon.size * 0.5 }}
            />
          </div>
        </motion.div>
      ))}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400 dark:text-pink-300 opacity-60"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: heart.size,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default Background;
