import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import queryPlugin from '@tailwindcss/container-queries';

export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
        },
      },
    },
  },
  plugins: [
    animatePlugin,
    queryPlugin,
    plugin(({ addBase, addComponents }) => {
      addBase({
        ':root': {
          '--primary': '208, 48, 40',
          '--secondary': '88, 48, 49',
          '--warning': '48, 70%, 55%',
          '--error': '0, 65%, 50%',
        },
      });
    }),
  ],
} satisfies Config;
