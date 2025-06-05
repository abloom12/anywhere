import { Page } from '@/core/Page';
import { html } from '@/shared/util/html';
import { getLoginForm } from '@/app/features/auth/login';

import { store } from '@/app/app';

export default class Login extends Page {
  #loginForm;

  constructor() {
    super();

    this.#loginForm = getLoginForm(({ data, resp }) => {
      //? if success
      //? - store token
      //? - get permissions and settings
      //? - navigate to home page with router
    });
  }

  render() {
    return html`<h1>Login Page</h1>
      ${this.#loginForm.render()}`;
  }
}
