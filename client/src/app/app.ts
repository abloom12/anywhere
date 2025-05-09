import { Router } from '@/core/Router';

export const AppRouter = new Router(
  '/webroot',
  document.querySelector('#app')!,
);
