import './style.css';

import { createRouter } from './router';
import { Form } from './components/form/Form';

const router = createRouter();

router.on('/user', () => {
  return {
    skeleton: '<div>User Loading...</div>',
    loadModule: async () => {
      const element = document.createElement('div');
      element.innerHTML = `<h1>User Page</h1>`;
      return element;
    },
  };
});

router.on('/user/:id', params => {
  return {
    skeleton: '<div>User Detail Loading...</div>',
    loadModule: async () => {
      const element = document.createElement('div');
      element.innerHTML = `<h1>User Detail Page for: ${params}</h1>`;
      return element;
    },
  };
});

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
