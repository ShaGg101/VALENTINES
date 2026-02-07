# 💕 Be My Valentine?

A beautiful, interactive Valentine's Day website built with React + Vite + Tailwind CSS.

## Features

- **Love Letter Page** – A heartfelt message with elegant typography
- **Valentine Question** – "Will you be my Valentine?" with a dodging "No" button
-  **Success Celebration** – Confetti, photos, and date details
-  **Mobile Responsive** – Works beautifully on phones and tablets
-  **Fully Customizable** – Edit colors, text, photos easily
-  **Accessible** – Keyboard navigation and screen reader friendly

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (accessible from other devices)
npm run dev -- --host

# Build for production
npm run build

# Preview production build
npm run preview -- --host
```

## 📱 Access from Phone

1. Run `npm run dev -- --host`
2. Find your PC's local IP:
   - Windows: `ipconfig` → look for IPv4 Address (e.g., `192.168.1.100`)
   - Mac/Linux: `ifconfig` or `ip addr`
3. On your phone (same Wi-Fi), open: `http://YOUR_IP:5173`

## 🎨 Customization

Edit the configuration in `src/context/ConfigContext.jsx`:

### Text Content
```javascript
love_letter: "Your custom love letter...",
letter_signature: "Forever yours ",
main_question: "Will you be my Valentine?",
success_message: "SAVE THE DATE, BABY!",
date_details: "February 14th, 7PM",
```

### Colors
```javascript
background_color: "#FFF5F5",    // Page background
surface_color: "#FFFFFF",        // Card backgrounds
text_color: "#4A3728",           // Main text
primary_action_color: "#E57373", // Buttons, hearts
secondary_action_color: "#FFCDD2", // Accents
```

### Photos
Add your photos to the `public/` folder, then update config:
```javascript
main_photo: "/your-photo.jpg",  // Polaroid on invitation page
gallery_photos: [               // 4 photos for success page
  "/photo1.jpg",
  "/photo2.jpg", 
  "/photo3.jpg",
  "/photo4.jpg"
],
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Confetti.jsx
│   ├── FloatingHearts.jsx
│   ├── HeartIcon.jsx
│   ├── PageBackground.jsx
│   ├── Polaroid.jsx
│   ├── SparkleIcon.jsx
│   └── Sparkles.jsx
├── context/
│   └── ConfigContext.jsx  # ⭐ Edit this to customize!
├── pages/
│   ├── Invitation.jsx
│   ├── LoveLetter.jsx
│   └── Success.jsx
├── styles/
│   └── index.css
├── ui/
│   └── Button.jsx
├── App.jsx
└── main.jsx
```

## 🚀 Deploy

### Vercel / Netlify
1. Push to GitHub
2. Connect repo to Vercel/Netlify
3. Deploy automatically

### Manual (Static Hosting)
```bash
npm run build
# Upload contents of `dist/` folder to your hosting
```

## License


