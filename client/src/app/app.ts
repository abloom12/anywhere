import { Router } from '@/core/Router';

import { EventBus } from '@/shared/util/event-bus';

function isGroup(part: string): boolean {
  return /^\(.*\)$/.test(part);
}

const rootElement: HTMLElement = document.querySelector('#app')!;
const AppRouter = new Router('/webroot', rootElement);
const bus = new EventBus<{
  'router:login': { userId: string };
}>();

const layouts = import.meta.glob('/src/app/pages/**/layout.ts');
const pages = import.meta.glob([
  '/src/app/pages/**/!(*layout).ts',
  '!/src/app/pages/not-found.ts',
]);

Object.entries(pages).forEach(([filePath, loader]) => {
  const parts = filePath
    .replace(/^.*\/pages\//, '')
    .replace(/\.ts$/, '')
    .split('/');

  const fileName = parts.pop()!;
  const segments = fileName.toLowerCase() === 'index' ? parts : [...parts, fileName];
  const rawUrl = segments.map(seg =>
    seg
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase(),
  );

  const rawPath = `/${rawUrl.join('/')}`;
  const path = `/${rawUrl.filter(p => !isGroup(p)).join('/')}`;

  console.log(rawPath);
  console.log(path);

  AppRouter.on({ path, loader });
});

// const layoutLoaders = Object.entries(layouts).map(([filePath, loader]) => {
//   const parts = filePath.replace(/^.*\/pages/, '').replace(/\/layout\.ts$/, '');
//   // console.log('layout parts', parts);
//   // const segments = parts.split('/').filter(seg => seg.length > 0 && !isGroup(seg));
//   // const path = segments.length ? `/${segments.join('/')}` : '/';
// });
