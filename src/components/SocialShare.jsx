import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, MessageCircle, Share2 } from 'lucide-react';

const SocialShare = ({ links }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = '🎂 Check out this amazing birthday wish!';

  const handleShare = (platform) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `${links.facebook}${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `${links.twitter}${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        url = `${links.whatsapp}${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Birthday Wish',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Share the Joy 🎉
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Spread the birthday cheer with your friends and family!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {navigator.share && (
            <motion.button
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          )}

          <motion.button
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </motion.button>

          <motion.button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Twitter className="w-5 h-5" />
            Twitter
          </motion.button>

          <motion.button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default SocialShare;
