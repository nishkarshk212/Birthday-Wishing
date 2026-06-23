# 🎂 Birthday Wisher - Modern Birthday Celebration Website

A beautiful, fully responsive single-page birthday wishing website with premium design, smooth animations, and interactive features.

## ✨ Features

- **Dynamic Floating Background** - Animated balloons, hearts, confetti, glowing particles, and gradient effects
- **Hero Section** - Birthday person's name, personalized message, countdown timer, and "Celebrate" button
- **Audio Player** - Auto-playing birthday song with play/pause, volume control, progress bar, and custom MP3 upload
- **Interactive Photo Gallery** - Masonry layout, lightbox preview, slideshow mode, zoom effects, and smooth transitions
- **Animated Birthday Cards** - Floating wishes with beautiful glassmorphism design
- **Cake-Cutting Animation** - Interactive cake with sparkles and fireworks on click
- **Theme Customization** - Dark/light mode toggle with smooth transitions
- **Social Sharing** - Facebook, Twitter, WhatsApp, and native share buttons
- **Mobile-Friendly** - Fully responsive design with smooth scrolling
- **Glassmorphism Cards** - Modern frosted glass effect
- **Elegant Typography** - Beautiful fonts with Poppins and Dancing Script

## 🚀 Quick Start

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎨 Customization

All customization is done through the `src/config.js` file. No code modification needed!

### Change Birthday Person's Information

Edit the `birthdayPerson` object in `src/config.js`:

```javascript
birthdayPerson: {
  name: "Sarah",           // Change the name
  age: 25,                 // Change the age
  message: "Your custom message here...",  // Personalized message
  birthdayDate: "2024-12-25", // Format: YYYY-MM-DD
},
```

### Customize Colors

Edit the `colors` object in `src/config.js`:

```javascript
colors: {
  light: {
    primary: "#FF6B9D",      // Main color
    secondary: "#C44569",     // Secondary color
    accent: "#FFD93D",       // Accent color
    background: "#FFF5F7",    // Background color
    surface: "#FFFFFF",       // Card/surface color
    text: "#2D3436",         // Text color
  },
  dark: {
    // Dark mode colors
  },
},
```

### Add Your Own Music

Replace the `defaultSong` URL in `src/config.js`:

```javascript
music: {
  defaultSong: "https://your-domain.com/birthday-song.mp3",
  autoPlay: true,   // Auto-play on load
  volume: 0.5,      // Default volume (0-1)
},
```

**Or upload a custom song directly from the website:**
- Click the upload button in the audio player
- Select your MP3 file
- It will play automatically

### Add Your Own Photos

Replace the URLs in the `galleryImages` array in `src/config.js`:

```javascript
galleryImages: [
  "https://your-domain.com/photo1.jpg",
  "https://your-domain.com/photo2.jpg",
  // Add more photos...
],
```

### Customize Floating Wishes

Edit the `wishes` array in `src/config.js`:

```javascript
wishes: [
  "Happy Birthday! 🎂",
  "Make a wish! ✨",
  // Add your custom wishes...
],
```

### Adjust Animation Settings

Edit the `animations` object in `src/config.js`:

```javascript
animations: {
  particleCount: 50,      // Number of floating particles
  balloonCount: 8,        // Number of balloons
  heartCount: 10,         // Number of hearts
  confettiCount: 100,     // Number of confetti particles
},
```

### Customize Social Sharing

Edit the `socialLinks` object in `src/config.js`:

```javascript
socialLinks: {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  twitter: "https://twitter.com/intent/tweet?url=",
  whatsapp: "https://wa.me/?text=",
},
```

## 📁 Project Structure

```
birthday-wisher/
├── src/
│   ├── components/
│   │   ├── Background.jsx       # Floating animations
│   │   ├── Hero.jsx             # Main hero section
│   │   ├── AudioPlayer.jsx      # Music player
│   │   ├── PhotoGallery.jsx     # Image gallery
│   │   ├── BirthdayCard.jsx     # Birthday cards
│   │   ├── CakeAnimation.jsx    # Cake cutting animation
│   │   ├── ThemeToggle.jsx      # Dark/light mode
│   │   ├── SocialShare.jsx      # Social sharing
│   │   └── FloatingWishes.jsx   # Floating wishes
│   ├── App.jsx                  # Main app component
│   ├── config.js                # Configuration file (EDIT THIS!)
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 How to Use

1. **Edit the Configuration**: Open `src/config.js` and customize all the content
2. **Add Your Content**: Replace placeholder images and music with your own
3. **Test Locally**: Run `npm run dev` to preview
4. **Deploy**: Build with `npm run build` and deploy the `dist` folder

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Canvas Confetti** - Confetti effects
- **Lucide React** - Icons

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effect on cards
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Framer Motion powered
- **Responsive Design** - Works on all screen sizes
- **Dark Mode** - Easy on the eyes at night
- **Custom Fonts** - Poppins and Dancing Script

## 🎉 Interactive Elements

- **Celebrate Button** - Triggers confetti explosion
- **Cake Cutting** - Interactive animation with sparkles
- **Photo Gallery** - Click to view in lightbox, slideshow mode
- **Audio Player** - Upload your own music
- **Theme Toggle** - Switch between light and dark mode
- **Social Sharing** - Share with friends and family

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

Made with ❤️ for special birthday celebrations
# Birthday-Wishing
