/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wakko: {
          rose: {
            DEFAULT: '#9C3A50',
            dark: '#7A2B3C',
            light: '#FFD9DE',
            subtle: '#FFF0F2',
          },
          gold: {
            DEFAULT: '#FDC979',
            dark: '#78530A',
            light: '#FFE4B8',
          },
          bg: '#FFF8F6',
          surface: '#FFFFFF',
          text: '#201A19',
          muted: '#554244',
          border: '#ECE0DD',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        wakko: '0 4px 20px rgba(156, 58, 80, 0.08)',
        'wakko-hover': '0 12px 32px rgba(156, 58, 80, 0.16)',
      },
    },
  },
  plugins: [],
};
