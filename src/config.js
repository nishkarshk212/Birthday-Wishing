// CONFIGURATION FILE - Edit these values to customize the website
export const config = {
  // Birthday person's information
  birthdayPerson: {
    name: "Anamika",
    age: 25,
    message: "Wishing you a day filled with love, laughter, and all your favorite things! May this year bring you endless joy and wonderful adventures.",
    birthdayDate: "2024-12-25", // Format: YYYY-MM-DD
  },

  // Theme colors (will be used as CSS variables)
  colors: {
    light: {
      primary: "#FFD700",
      secondary: "#FF6B6B",
      accent: "#4ECDC4",
      background: "#0A0A0A",
      surface: "#1A1A1A",
      text: "#FFFFFF",
    },
    dark: {
      primary: "#FFD700",
      secondary: "#FF6B6B",
      accent: "#4ECDC4",
      background: "#000000",
      surface: "#111111",
      text: "#FFFFFF",
    },
  },

  // Default music (you can replace with your own MP3 file)
  music: {
    defaultSong: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Replace with your MP3 URL
    autoPlay: true,
    volume: 0.5,
  },

  // Photo gallery images (add your image URLs here)
  galleryImages: [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&h=700&fit=crop",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop",
  ],

  // Floating wishes messages
  wishes: [
    "Happy Birthday! 🎂",
    "Make a wish! ✨",
    "Celebrate! 🎉",
    "Joy & Happiness! 💖",
    "Best Wishes! 🌟",
    "Amazing Day! 🎈",
    "Love & Laughter! 💕",
    "Dreams Come True! 🌈",
  ],

  // Social sharing links
  socialLinks: {
    facebook: "https://www.facebook.com/sharer/sharer.php?u=",
    twitter: "https://twitter.com/intent/tweet?url=",
    whatsapp: "https://wa.me/?text=",
  },

  // Animation settings
  animations: {
    particleCount: 50,
    balloonCount: 8,
    heartCount: 10,
    confettiCount: 100,
  },
};
