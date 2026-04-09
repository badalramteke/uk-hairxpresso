/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // Override defaults so every element gets our fonts
      sans: ['DM Sans', 'Manrope', 'system-ui', 'sans-serif'],
      serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      mono: ['Space Grotesk', 'monospace'],
    },
    extend: {
      colors: {
        dark: {
          50: '#2A2A2A',
          100: '#232323',
          200: '#1A1A1A',
          300: '#151515',
          400: '#111111',
          500: '#0D0D0D',
          600: '#0A0A0A',
          700: '#080808',
          800: '#060606',
          900: '#050505',
        },
        gold: {
          300: '#F0D060',
          400: '#E8C84A',
          500: '#D4AF37',
          600: '#B8972E',
          700: '#9A7A24',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        syne: ['Syne', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 0 60px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
}
