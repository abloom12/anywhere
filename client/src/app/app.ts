//* MOVE BELOW TO APP.TS
import { Router } from '@/core/Router';

function isGroup(part: string) {
  return /^\(.*\)$/.test(part);
}

export function loadApp() {
  const rootElement: HTMLElement = document.querySelector('#app')!;

  const AppRouter = new Router('/webroot', rootElement);

  const pages = import.meta.glob([
    '/src/app/pages/**/!(*layout).ts',
    '!/src/app/pages/not-found.ts',
  ]);
  const layouts = import.meta.glob('/src/app/pages/**/layout.ts');

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

    AppRouter.on({ path, loader });
  });

  Object.entries(layouts).forEach(([filePath, loader]) => {
    const parts = filePath.replace(/^.*\/pages/, '').replace(/\/layout\.ts$/, '');
    console.log('layout parts', parts);

    // const segments = parts.split('/').filter(seg => seg.length > 0 && !isGroup(seg));
    // const path = segments.length ? `/${segments.join('/')}` : '/';
  });
}
