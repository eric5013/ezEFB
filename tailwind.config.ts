// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      minHeight: {
        tap: '44px',
        button: '48px',
        efb: '56px',
      },
      screens: {
        ipad: '768px',
        'ipad-landscape': '1024px',
        cockpit: '1366px',
      },
      colors: {
        efb: {
          bg: '#0a0a0a',
          panel: '#1a1a1a',
          border: '#333333',
          text: '#e5e5e5',
          accent: '#007AFF',
          warning: '#FF9500',
          danger: '#FF3B30',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;