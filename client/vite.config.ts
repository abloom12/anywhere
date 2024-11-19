/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {},
    // plugins: [
    //   VitePWA({ registerType: 'autoUpdate' })
    // ],
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
