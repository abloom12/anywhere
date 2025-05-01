import './style.css';

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register(
//     import.meta.env.MODE === 'production' ?
//       '/sw.js'
//     : '/dev-sw.js?dev-sw',
//   );
// }

document.addEventListener('DOMContentLoaded', () => {
  // loadApp(document.querySelector('#app'));
});

//* MOVE BELOW TO APP.TS
import { Router } from '@/core/Router';

const AppRouter = new Router('#app');

const pages = import.meta.glob('/src/app/pages/**/*.ts');

Object.entries(pages).forEach(([filePath, loader]) => {
  const parts = filePath
    .replace(/^.*\/pages\//, '')
    .replace(/\.ts$/, '')
    .split('/');

  const fileName = parts.pop()!;
  const dirs = parts;

  const segments = fileName.toLowerCase() === 'index' ? dirs : [...dirs, fileName];

  const path = `/${segments
    .map(seg =>
      seg
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase(),
    )
    .join('/')}`;

  AppRouter.on({ path, loader });
});
