/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      target: ['chrome112', 'edge112', 'safari17'],
      // rollupOptions: {
      //   output: {
      //     manualChunks(id: string) {
      //       // only split code under your pages directory
      //       const pagesDir =
      //         path.resolve(__dirname, 'src/app/pages') + path.sep;
      //       if (id.startsWith(pagesDir)) {
      //         // get the path relative to pagesDir
      //         const rel = id.slice(pagesDir.length);
      //         // grab the top-level folder name (or file if you have pages directly in pages/)
      //         const [group] = rel.split(path.sep);
      //         // name your chunk after that group
      //         return `pages-${group}`;
      //       }
      //       // otherwise, let Rollup handle it (e.g. vendor, shared libs)
      //     },
      //   },
      // },
    },
    plugins: [],
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
