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
        'blue-sky': '#edf3fc',
        'dark-blue': '#0c152c',
        'main-color': '#279AFF',
        'heading-color': '#0c152c',
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
