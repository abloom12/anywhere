import { Router } from '@/core/Router';

export const AppRouter = new Router(
  '/webroot',
  document.querySelector('#app')!,
);

AppRouter.use(async ({ next, path }) => {
  // if (path !== '/login' && !isAuthenticated) {
  //   AppRouter.navigate('/login');
  //   return;
  // }

  return next();
});
