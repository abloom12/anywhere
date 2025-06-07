import { Router } from '@/core/Router';
import { Store } from '@/core/Store';

//TODO: change store, router to appStore, appRouter
//TODO: also change permissions and settings stores to appPermissions, appSettings

export const store = new Store<any>();

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
