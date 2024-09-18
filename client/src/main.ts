import './style.css';

import { Form } from './components/form/Form';
import { Router } from './router';

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

const router = new Router();
