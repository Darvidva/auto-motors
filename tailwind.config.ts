import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-barlow)', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0E0E0E',
          card: '#161616',
          surface: '#1F1F1F',
          gold: '#C9A84C',
          'gold-light': '#E2BC6A',
          'off-white': '#F0EDE8',
          'warm-grey': '#9A9490',
          border: '#2A2A2A',
          error: '#C0392B',
        },
        background: '#0E0E0E',
        foreground: '#F0EDE8',
        card: {
          DEFAULT: '#161616',
          foreground: '#F0EDE8',
        },
        popover: {
          DEFAULT: '#1F1F1F',
          foreground: '#F0EDE8',
        },
        primary: {
          DEFAULT: '#C9A84C',
          foreground: '#0E0E0E',
        },
        secondary: {
          DEFAULT: '#161616',
          foreground: '#F0EDE8',
        },
        muted: {
          DEFAULT: '#161616',
          foreground: '#9A9490',
        },
        accent: {
          DEFAULT: '#C9A84C',
          foreground: '#0E0E0E',
        },
        destructive: {
          DEFAULT: '#C0392B',
          foreground: '#F0EDE8',
        },
        border: '#2A2A2A',
        input: '#2A2A2A',
        ring: '#C9A84C',
      },
      borderRadius: {
        lg: '6px',
        md: '4px',
        sm: '2px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s infinite',
        'fade-up': 'fade-up 0.4s ease-out forwards',
        'ken-burns': 'ken-burns 8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
