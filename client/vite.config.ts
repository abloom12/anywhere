/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      target: ['chrome112', 'edge112', 'safari17'],
    },
    plugins: [
      VitePWA({
        srcDir: 'src',
        filename: 'sw.ts',
        strategies: 'injectManifest',
        injectRegister: false,
        manifest: false,
        injectManifest: {
          injectionPoint: undefined,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
    },
  };
});
