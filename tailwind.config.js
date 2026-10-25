/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#f4f4f5',
        primary: {
          DEFAULT: '#ff4747',
          hover: '#e03e3e',
          light: '#ff6b6b',
          dark: '#c92a2a',
        },
        nectar: {
          dark: '#09090b',
          card: '#121215',
          border: '#27272a',
          hover: '#18181b',
          muted: '#71717a',
          pink: '#ff4747',
          purple: '#9333ea',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        favorit: ['var(--font-favorit)', 'system-ui', 'sans-serif'],
        extended: ['var(--font-favorit-extended)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
