import './style.css';

import { Form } from './components/form/Form';
import { field } from './components/form/_configurator';

const form = new Form({
  name: 'test',
  fields: [
    field.text('firstname', 'First Name').required().disabled().$,
    field.checkbox('callback', 'Should Call').$,
    field.textarea('textarea', 'About You').$,
  ],
});

const app = document.getElementById('app');
if (app) {
}
