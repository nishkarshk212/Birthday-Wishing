import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Gift } from 'lucide-react';

const BirthdayCard = () => {
  const cards = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "With Love",
      message: "May your heart be filled with endless love and joy today and always.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Shine Bright",
      message: "You are a star that lights up every room. Keep shining bright!",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Gift className="w-12 h-12" />,
      title: "Special Gift",
      message: "The greatest gift is having you in our lives. Happy Birthday!",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Birthday Wishes 🎁
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Special messages just for you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="glassmorphism rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${card.color} text-white mb-6 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {card.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BirthdayCard;
