import { fetchData } from '@/shared/util/fetch';
import { Router } from '@/core/Router';
import { Store } from '@/core/Store';

export const permissions = new Store<boolean | string>();
export const settings = new Store<boolean | string>();

export const router = new Router(
  '/webroot',
  document.querySelector('#app')! as HTMLElement,
);

router.use(async ({ next, path }) => {
  const isAuthenticated = false;
  if (path !== '/login' && !isAuthenticated) {
    router.navigate('/login');
    return;
  }

  return next();
});

router.use(({ next, path }) => {
  fetchData('featureLogging', {
    featureDescription: 'Anywhere __moduleName__',
  });

  return next();
});

// Start App
router.navigate('/');
