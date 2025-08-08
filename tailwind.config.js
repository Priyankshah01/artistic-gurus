/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Your custom brand fonts
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },

      // Custom brand color palette
      colors: {
        brand: {
          DEFAULT: '#4F46E5',       // Indigo 600
          light: '#6366F1',         // Indigo 500
          dark: '#4338CA',          // Indigo 700
          accent: '#FBBF24',        // Amber 400
        },
      },

      // Extend blur utilities for marquee edge fade
    //   blur: {
    //     xs: '2px',
    //     sm: '4px',
    //     md: '8px',
    //     lg: '12px',
    //     xl: '24px',
    //   },

      // Custom keyframes for marquee and card-swap animation
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      animation: {
        marquee: 'marquee 30s linear infinite',
        swap: 'swap 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
