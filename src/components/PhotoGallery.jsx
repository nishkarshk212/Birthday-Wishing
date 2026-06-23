import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const PhotoGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsSlideshow(false);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const toggleSlideshow = () => {
    setIsSlideshow(!isSlideshow);
  };

  React.useEffect(() => {
    let interval;
    if (isSlideshow && selectedImage) {
      interval = setInterval(nextImage, 3000);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, selectedImage]);

  useEffect(() => {
    anime({
      targets: '.gallery-item',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          Precious Moments 💕
        </h2>
        <p className="text-center text-gray-300 mb-12">
          A collection of beautiful memories
        </p>

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg gallery-item"
              style={{ opacity: 0 }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 lightbox"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white hover:text-primary transition-colors z-10 flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleSlideshow();
              }}
            >
              <Play className="w-5 h-5" />
              {isSlideshow ? 'Pause' : 'Slideshow'}
            </button>

            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
