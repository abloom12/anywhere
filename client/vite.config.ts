import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        //'@ui': path.resolve(__dirname, './src/components'),
      },
    },
    test: {
      environment: 'jsdom',
    },
  };
});
