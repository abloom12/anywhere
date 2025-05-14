import { Component } from '@/core/Component';
import { html } from '@/shared/util/html';
import { Form, field } from '@/shared/components/ui/Form/Form';

export class LoginForm extends Component {
  #form: Form;

  constructor() {
    super();

    this.#form = new Form({
      name: 'loginForm',
      fields: [
        field.text('username', 'Login Name').$,
        field.password('password', 'Password').$,
      ],
    });
  }

  render() {
    return html``;
  }
}
