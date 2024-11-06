import './style.css';

import { Form } from './components/form/Form';
import { field } from './components/form/_configurator';

const form = new Form({
  name: 'login',
  fields: [field.text('username', 'User Name').$],
});

const app = document.getElementById('app');
if (app) {
  form.appendTo(app);
}

type Test = {
  firstName: string;
  lastName: string;
  age: number;
};
