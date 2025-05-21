import { Page } from '@/core/Page';
import { html } from '@/shared/util/html';
import { loginForm } from '@/app/features/auth/login';

export default class Login extends Page {
  #form;

  constructor() {
    super();

    this.#form = loginForm;
  }

  render() {
    return html`<h1>Login Page</h1>
      ${this.#form.render()}`;
  }
}
