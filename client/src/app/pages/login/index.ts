import { Page } from '@/core/Page';
import { html } from '@/core/html';
import { getLoginForm } from '@/app/features/auth/login';

import { router } from '@/app/app';

export default class Login extends Page {
  #loginForm;

  constructor() {
    super();

    this.#loginForm = getLoginForm({
      onSubmit: ({ resp }) => {
        if (resp.kind === 'success') {
          //TODO: - store token
          //TODO: - get permissions and settings
          router.navigate('/');
          return;
        }

        if (resp.kind === 'mfa') {
          //TODO: mfa shit
          return;
        }

        if (resp.kind === 'failed attempts') {
          //TODO: need to keep track of # of failed attempts
          return;
        }

        if (resp.kind === 'error') {
          //TODO: display resp.message
          return;
        }

        //TODO: handle unexpected?
      },
    });
  }

  render() {
    return html`${this.#loginForm.render()}`;
  }
}
