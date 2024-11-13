import './style.css';

import { Form } from './components/form/Form';
import { field } from './components/form/_configurator';
import { md5 } from './util/crypto';
import { fetchData } from '@/util/fetch';

const form = new Form({
  name: 'login',
  fields: [
    field.text('username', 'User Name').$,
    field.password('password', 'Password').$,
    field.date('dateofbirth', 'Birthday').$,
    field.email('emailaddress', 'Email').$,
    field.number('age', 'Age').$,
    field.tel('cell', 'Cell Number').$,
    field.time('startTime', 'Start Time').$,
    field.select('chooseOne', 'Choose One').$,
    field.textarea('aboutYou', 'About You').$,
    field.checkbox('checkone', 'One').$,
    field.checkbox('checktwo', 'Two').$,
    field.checkbox('checkthree', 'Three').$,
    {
      legend: 'Radios',
      fields: [
        field.radio('radioGroup', 'One').$,
        field.radio('radioGroup', 'Two').$,
        field.radio('radioGroup', 'Three').$,
      ],
    },
  ],
});

const app = document.getElementById('app');
if (app) {
  form.appendTo(app);
}
