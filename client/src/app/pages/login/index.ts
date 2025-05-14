import { Page } from '@/core/Page';
import { html } from '@/shared/util/html';
import { Form, field, action } from '@/shared/components/ui/Form/Form';

function authenticateUser() {
  // onSubmit call /getLogIn
  // getLogInResults === TOKEN
  // store TOKEN in global store
}

export default class LoginPage extends Page {
  #LoginForm: Form;

  constructor() {
    super();

    this.#LoginForm = new Form({
      name: 'loginForm',
      fields: [
        field.text('username', 'Login Name').$,
        field.password('password', 'Password').$,
        //action.button('Login').$,
      ],
    });
  }

  render() {
    return html`<h1>Login Page</h1>
      ${this.#LoginForm.render()}`;
  }
}
