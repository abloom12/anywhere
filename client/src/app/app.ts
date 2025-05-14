import { Router } from '@/core/Router';
import { Permissions } from './permissions';

const isAuthenticated = false;

export const AppRouter = new Router(
  '/webroot',
  document.querySelector('#app')! as HTMLElement,
);

AppRouter.use(async ({ next, path }) => {
  if (path !== '/login' && !isAuthenticated) {
    AppRouter.navigate('/login');
    return;
  }

  return next();
});

export const permissions = new Permissions<boolean | string>({
  token: 'admin',
});

AppRouter.navigate('/');
