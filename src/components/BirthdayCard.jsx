import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Heart, Star, Gift } from 'iconsax-react';

const BirthdayCard = () => {
  const cards = [
    {
      icon: <Heart className="w-12 h-12" variant="Bold" />,
      title: "With Love",
      message: "May your heart be filled with endless love and joy today and always.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Star className="w-12 h-12" variant="Bold" />,
      title: "Shine Bright",
      message: "You are a star that lights up every room. Keep shining bright!",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Gift className="w-12 h-12" variant="Bold" />,
      title: "Special Gift",
      message: "The greatest gift is having you in our lives. Happy Birthday!",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  useEffect(() => {
    anime({
      targets: '.card-item',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(200),
      duration: 500,
      easing: 'easeOutQuad',
    });
  }, []);

  const handleCardHover = (e) => {
    anime({
      targets: e.currentTarget.querySelector('.card-icon'),
      rotate: 360,
      duration: 600,
      easing: 'easeOutQuad',
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          Birthday Wishes 🎁
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Special messages just for you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="glassmorphism rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 card-item"
              style={{ opacity: 0 }}
              onMouseEnter={handleCardHover}
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${card.color} text-white mb-6 shadow-lg card-icon`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {card.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {card.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BirthdayCard;
