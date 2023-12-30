import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/background-hero.svg')",
        'clouds-pattern': "url('/background-clouds.svg')",

      },
      colors: {
        'red-warning': '#ff001a',
        blue: '#0062b8',
        gray: '#dedede',
        'gray-light': '#f6f6f9',
        'blue-light': '#cedfe9',
        'blue-sky': '#edf3fc',
        'dark-blue': '#0c152c',
        'main-color': '#279AFF',
        'heading-color': '#142348',
        'paragraph-color': 'rgba(12, 21, 44, 0.6)',
      },
      gridTemplateColumns: {
        'images-layout': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
};
export default config;
