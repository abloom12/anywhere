import { Router } from '@/core/Router';
import { Store } from '@/core/Store';

export const store = new Store<any>();
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

// Start App
router.navigate('/');

//TODO: figure out where to put the following
// setUpGoogleMapsApi()
// knob()
