import React, { useEffect } from 'react';
import anime from 'animejs';
import { Facebook, Twitter, Whatsapp, Share } from 'iconsax-react';

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

  useEffect(() => {
    anime({
      targets: '.share-btn',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          Share the Joy 🎉
        </h2>
        <p className="text-gray-300 mb-12">
          Spread the birthday cheer with your friends and family!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all share-btn"
              style={{ opacity: 0 }}
            >
              <Share className="w-5 h-5" variant="Bold" />
              Share
            </button>
          )}

          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all share-btn"
            style={{ opacity: 0 }}
          >
            <Facebook className="w-5 h-5" variant="Bold" />
            Facebook
          </button>

          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all share-btn"
            style={{ opacity: 0 }}
          >
            <Twitter className="w-5 h-5" variant="Bold" />
            Twitter
          </button>

          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all share-btn"
            style={{ opacity: 0 }}
          >
            <Whatsapp className="w-5 h-5" variant="Bold" />
            WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialShare;
