import { Page } from '@/core/Page';
import { html } from '@/shared/util/html';
import { Form, field, action } from '@/shared/components/ui/Form/Form';

export default class Login extends Page {
  #form: Form;

  constructor() {
    super();

    this.#form = new Form({
      name: 'loginForm',
      fields: [
        field.text('username', 'Login Name').$,
        field.password('password', 'Password').$,
      ],
      buttons: [action.button('Login').$],
      onSubmit: this.#onSubmit,
    });
  }

  #onSubmit(data: Record<string, FormDataEntryValue>) {
    // fetch /getLogIn
    // set permissions
    // set settings
  }

  render() {
    return html`<h1>Login Page</h1>
      ${this.#form.render()}`;
  }
}
