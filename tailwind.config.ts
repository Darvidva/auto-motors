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
          bg: '#FFFFFF',
          card: '#FAFAFA',
          surface: '#F5F5F5',
          gold: '#B8860B',
          'gold-light': '#D4A418',
          'gold-dark': '#8B6914',
          dark: '#1A1A1A',
          'dark-grey': '#4A4A4A',
          'mid-grey': '#6B6B6B',
          'light-grey': '#9A9A9A',
          border: '#E5E5E5',
          'border-dark': '#D4D4D4',
          error: '#C0392B',
          success: '#27AE60',
        },
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        card: {
          DEFAULT: '#FAFAFA',
          foreground: '#1A1A1A',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1A',
        },
        primary: {
          DEFAULT: '#B8860B',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F5F5F5',
          foreground: '#1A1A1A',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#B8860B',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#C0392B',
          foreground: '#FFFFFF',
        },
        border: '#E5E5E5',
        input: '#F5F5F5',
        ring: '#B8860B',
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
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
        'bar-pulse': {
          '0%, 100%': { transform: 'scaleY(0.4)', opacity: '0.4' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s infinite',
        'fade-up': 'fade-up 0.4s ease-out forwards',
        'ken-burns': 'ken-burns 8s ease-in-out infinite alternate',
        'bar-pulse': 'bar-pulse 0.8s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
