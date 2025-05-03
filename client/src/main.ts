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

const pages = import.meta.glob([
  '/src/app/pages/**/!(*layout).ts',
  '!/src/app/pages/not-found.ts',
]);
const layouts = import.meta.glob('/src/app/pages/**/layout.ts');

const isGroup = (part: string) => /^\(.*\)$/.test(part);
Object.entries(pages).forEach(([filePath, loader]) => {
  const parts = filePath
    .replace(/^.*\/pages\//, '')
    .replace(/\.ts$/, '')
    .split('/');

  const filtered = parts.filter(p => !isGroup(p));

  const fileName = filtered.pop()!;
  const dirs = filtered;

  const segments = fileName.toLowerCase() === 'index' ? dirs : [...dirs, fileName];

  const path = `/${segments
    .map(seg =>
      seg
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase(),
    )
    .join('/')}`;

  console.log('route path', path);

  // AppRouter.on({ path, loader });
});

Object.entries(layouts).forEach(([filePath, loader]) => {
  const raw = filePath.replace(/^.*\/pages/, '').replace(/\/layout\.ts$/, '');

  const segments = raw.split('/').filter(seg => seg.length > 0 && !isGroup(seg));

  const path = segments.length ? `/${segments.join('/')}` : '/';

  console.log('layout path', path);
});
