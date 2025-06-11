import { Router } from '@/core/Router';
import { Store } from '@/core/Store';

export const appStore = new Store<any>();
export const appRouter = new Router(
  '/webroot',
  document.querySelector('#app')! as HTMLElement,
);

//TODO: blacklist route paths
//TODO: get isAuthenticated

appRouter.use(async ({ next, path }) => {
  const isAuthenticated = false;
  if (path !== '/login' && !isAuthenticated) {
    appRouter.navigate('/login');
    return;
  }

  return next();
});

// Start App
appRouter.navigate('/');

//TODO: figure out where to put the following
// setUpGoogleMapsApi()
// knob()
