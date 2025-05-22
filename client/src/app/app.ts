import { Router } from '@/core/Router';

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
