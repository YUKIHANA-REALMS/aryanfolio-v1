export const themeConfig = {
  // Color Scheme - AMOLED Black + White Only
  colors: {
    primary: '#000000',        // AMOLED Black
    secondary: '#FFFFFF',      // White
    background: '#000000',     // AMOLED Black
    foreground: '#FAFAFA',     // Near White
    muted: '#737373',          // Gray
    accent: '#FFFFFF',         // White
  },
  
  // Typography
  fonts: {
    sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
    code: ['Fira Code', 'JetBrains Mono', 'Courier New', 'monospace'],
  },
  
  // Animation Settings
  animations: {
    speed: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.6s',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },
  
  // Effects
  effects: {
    glowEnabled: true,
    particlesEnabled: true,
    scrollProgressEnabled: true,
    typingAnimationEnabled: true,
    floatAnimationEnabled: true,
    glassmorphismEnabled: true,
  },
  
  // Layout
  layout: {
    maxWidth: '1280px',
    containerPadding: '2rem',
    borderRadius: '0.75rem',
  },
} as const;

export type ThemeConfig = typeof themeConfig;
