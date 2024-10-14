import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import queryPlugin from '@tailwindcss/container-queries';

export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: {},
      },
    },
  },
  plugins: [
    animatePlugin,
    queryPlugin,
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--primary': '54, 106, 152', // 208, 48, 40 || #366a98
          '--secondary': '129, 185, 65', // 88, 48, 49 || #81b941
        },
      });
    }),
  ],
} satisfies Config;
