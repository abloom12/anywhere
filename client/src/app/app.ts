import { Router } from '@/core/Router';

export const AppRouter = new Router(
  '/webroot',
  document.querySelector('#app')!,
);

const layouts = import.meta.glob('/src/app/pages/**/layout.ts');
const layoutMap = Object.fromEntries(
  Object.entries(layouts)
    .map(([filePath, loader]) => {
      const key = filePath
        .replace(/^.*\/pages/, '')
        .replace(/\/layout\.ts$/, '')
        .toLowerCase();

      return [key, loader] as const;
    })
    .sort(([a], [b]) => a.length - b.length),
);

const pages = import.meta.glob([
  '/src/app/pages/**/!(*layout).ts',
  '!/src/app/pages/404.ts',
]);

const CAMEL_TO_DASH1 = /([a-z0-9])([A-Z])/g;
const CAMEL_TO_DASH2 = /([A-Z])([A-Z][a-z])/g;
const STRIP_LEADING = /^.*\/pages\//;
const STRIP_TS_EXT = /\.ts$/;
const GROUP_SEGMENT = /^\(.*\)$/;

for (const [filePath, loader] of Object.entries(pages)) {
  // Parse File Path
  const parts = filePath
    .replace(STRIP_LEADING, '')
    .replace(STRIP_TS_EXT, '')
    .toLowerCase()
    .split('/');

  const fileName = parts.pop()!;
  const segments = (
    fileName === 'index' ? parts : [...parts, fileName]).map(seg =>
    seg
      .replace(CAMEL_TO_DASH1, '$1-$2')
      .replace(CAMEL_TO_DASH2, '$1-$2'),
  );

  // Grab Layouts for Route
  let segment = '';
  const layouts = new Map<string, () => Promise<any>>();
  for (let index = 0; index < segments.length; index++) {
    segment += `/${segments[index]}`;

    const layoutLoader = layoutMap[segment];
    if (layoutLoader) {
      layouts.set(segment, layoutLoader);
    }
  }

  // Register with Router
  AppRouter.on({
    path: `/${segments.filter(p => !GROUP_SEGMENT.test(p)).join('/')}`,
    loader,
    layouts,
  });
}
