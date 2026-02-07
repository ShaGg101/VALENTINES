import { createContext, useContext, useState, useCallback } from 'react';

// Default configuration - edit these values to customize your Valentine's message!
export const defaultConfig = {
  // === LOVE LETTER PAGE ===
  love_letter: `I’ve been thinking a lot lately about how much you’ve changed my world since the day we met. I realized that there wasn’t a single day where I wasn't smiling simply because you are in my life. You have this way of making everything brighter just by being there.
Whenever we are together, I find myself wishing I had the power to make time stop. It feels like the hours turn into seconds when I’m with you, and I’m always left wishing for just a few more minutes, another hour, or a whole lifetime more in that exact moment.
You are the person I’ve always dreamed of and seeing you right in front of me feels like a dream I never have to wake up from. I want you to know how deeply love you and how much I treasure every second we spend side by side.
Thank you for being you, and for giving me a million reasons to smile every single day.
`,
  letter_signature: "Forever yours",
  letter_name: "- Kervey",
  next_button_text: "Continue Reading",

  // === INVITATION PAGE ===
  main_question: "Will you be my Valentine?",
  polaroid_caption: "Us ",
  yes_button_text: "Yes! ",
  no_button_text: "No",

  // === SUCCESS PAGE ===
  success_message: "SAVE THE DATE, LOVE!",
  love_message: "I LOVE YOU!",
  code_message: "I’m so excited for all the beautiful things we have yet to experience together. Thank you for being my dream come true.",
  date_details: "Don't be late!",
  final_message: "I can't wait for our date! ",

  // === THEME COLORS ===
  // Change these to customize the color scheme
  background_color: "#FFF5F5",
  surface_color: "#FFFFFF",
  text_color: "#4A3728",
  primary_action_color: "#E57373",
  secondary_action_color: "#FFCDD2",

  // === PHOTOS ===
  // Add your photo URLs here (can be local paths in /public folder or URLs)
  // Example: "/photos/us.jpg" or "https://example.com/photo.jpg"
  main_photo: "/photos/1.jpg", // Photo for the invitation page polaroid
  gallery_photos: [null, null, null, null], // 4 photos for the success page collage

  // === CONFETTI SETTINGS ===
  confetti_count: 30,
  confetti_colors: ["#E57373", "#FFCDD2", "#FFD700", "#FF69B4"],
};

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);

  // Update CSS variables when colors change
  const updateConfig = useCallback((newConfig) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Update CSS variables for theme colors
      const root = document.documentElement;
      root.style.setProperty('--color-background', updated.background_color);
      root.style.setProperty('--color-surface', updated.surface_color);
      root.style.setProperty('--color-foreground', updated.text_color);
      root.style.setProperty('--color-primary', updated.primary_action_color);
      root.style.setProperty('--color-secondary', updated.secondary_action_color);
      
      return updated;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    const root = document.documentElement;
    root.style.setProperty('--color-background', defaultConfig.background_color);
    root.style.setProperty('--color-surface', defaultConfig.surface_color);
    root.style.setProperty('--color-foreground', defaultConfig.text_color);
    root.style.setProperty('--color-primary', defaultConfig.primary_action_color);
    root.style.setProperty('--color-secondary', defaultConfig.secondary_action_color);
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
