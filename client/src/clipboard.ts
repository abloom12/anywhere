// router.createRoute({
//   path: '/users',
//   view: `<div>Users<div class="nested-view"></div></div>`,
//   children: [
//     { path: '/:id', view: `<div>User ID<div class="nested-view"></div></div>` },
//     { path: '/add', view: `<div>Add new user</div>` },
//   ],
// });

// router.createRoute({
//   path: '/users/:id/details',
//   view: `<div>User Details Page</div>`,
// });

// router.createRoute({
//   path: '/users/:id/posts',
//   view: `<div>Posts Page<div class="nested-view"></div></div>`,
//   children: [
//     { path: '/:postid', view: `<div>Post Details</div>` }, // Nested under /users/:id/posts
//   ],
// });

// const form = new Form({
//   name: 'test',
//   fields: [
//     field.text('firstname', 'First Name').required()._,
//     field.text('lastname', 'Last Name').required().$,
//     field.number('age', 'Age').min(18).cfg,
//     field.telephone('phone', 'Phone #').required().c,
//     field.textarea('about', 'About You').max(10000).,
//   ],
// });
