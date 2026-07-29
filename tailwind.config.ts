import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pulled from the English Pathshala logo: sky-blue laptop + navy outline
        brand: {
          50: '#eff9ff',
          100: '#def1ff',
          200: '#b6e6ff',
          300: '#75d3ff',
          400: '#2cbcff',
          500: '#02a3f5',
          600: '#0082d2',
          700: '#0067aa',
          800: '#05578c',
          900: '#0b4874',
          950: '#072d4d',
        },
        ink: {
          DEFAULT: '#12263f',
          soft: '#3d5470',
          muted: '#6b7f96',
        },
        sand: '#fdfaf4',
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(18 38 63 / 0.08), 0 12px 32px -8px rgb(18 38 63 / 0.10)',
        lift: '0 8px 16px -6px rgb(18 38 63 / 0.12), 0 24px 48px -12px rgb(18 38 63 / 0.16)',
        glow: '0 0 0 1px rgb(2 163 245 / 0.18), 0 12px 40px -12px rgb(2 163 245 / 0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.24, 0, 0.38, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
