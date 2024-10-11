import './style.css';

import { Router } from './lib/router';

const router = new Router();

// router.createRoute({ path: '/users' });
// router.createRoute({ path: '/users/:id' });
// router.createRoute({ path: '/users/:id/details' });
// router.createRoute({ path: '/users/:id/posts' });
// router.createRoute({ path: '/users/:id/posts/:postid' });

// router.createRoute({ path: '/foo/:bar/:baz' });

// router.visualizeTrie();

// router.navigate('/users');

router.createRoute({
  path: '/home',
});
