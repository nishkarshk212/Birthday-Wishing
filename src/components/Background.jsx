import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { config } from '../config';

const Background = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create elegant particles
    const particleCount = config.animations.particleCount;
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFFFFF', '#FFA500'];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Background colors for transitions
    const bgColors = [
      '#000000',
      '#0A0A0A',
      '#1A1A2E',
      '#16213E',
      '#0F0F23',
      '#1A1A1A',
      '#0D0D0D',
    ];
    let currentColorIndex = 0;

    // Animate background color changes
    const animateBackground = () => {
      if (bgRef.current) {
        anime({
          targets: bgRef.current,
          backgroundColor: bgColors[currentColorIndex],
          duration: 1000,
          easing: 'easeInOutQuad',
        });
      }
      currentColorIndex = (currentColorIndex + 1) % bgColors.length;
    };

    // Start background color animation
    animateBackground();
    const bgInterval = setInterval(animateBackground, 2000);

    // Animate particles with anime.js
    const animateParticles = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(20, 20, 30, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines for nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Add floating orbs animation
    const createOrb = () => {
      const orb = document.createElement('div');
      orb.className = 'fixed rounded-full pointer-events-none';
      orb.style.width = Math.random() * 100 + 50 + 'px';
      orb.style.height = orb.style.width;
      orb.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}33, transparent)`;
      orb.style.left = Math.random() * 100 + '%';
      orb.style.top = Math.random() * 100 + '%';
      orb.style.filter = 'blur(40px)';
      orb.style.zIndex = '1';
      document.body.appendChild(orb);

      anime({
        targets: orb,
        translateX: [
          { value: anime.random(-200, 200), duration: 3000 },
          { value: anime.random(-200, 200), duration: 3000 },
        ],
        translateY: [
          { value: anime.random(-200, 200), duration: 3000 },
          { value: anime.random(-200, 200), duration: 3000 },
        ],
        scale: [
          { value: [1, 1.5], duration: 3000 },
          { value: [1.5, 1], duration: 3000 },
        ],
        opacity: [0.3, 0.6, 0.3],
        easing: 'easeInOutQuad',
        duration: 6000,
        loop: true,
      });

      return orb;
    };

    const orbs = [];
    for (let i = 0; i < 5; i++) {
      orbs.push(createOrb());
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(bgInterval);
      orbs.forEach(orb => orb.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        ref={bgRef}
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: '#000000' }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
    </div>
  );
};

export default Background;
