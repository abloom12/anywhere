import { Page } from '@/core/Page';
import { html } from '@/core/html';

import { getLoginForm, type LoginResult } from '@/app/features/auth/login';
import { appPermissions, setUserPermissions } from '@/app/features/user/permissions';

import { appRouter } from '@/app/app';

export default class Login extends Page {
  #loginForm;

  constructor() {
    super();

    this.#loginForm = getLoginForm(this.#onLogin);
  }

  async #onLogin(resp: LoginResult) {
    if (resp.type === 'success') {
      appPermissions.set('token', resp.token);
      await setUserPermissions();
      appRouter.navigate('/');
      return;
    }

    if (resp.type === 'mfa') {
      //TODO: mfa shit
      //? resp.deviceId === localDeviceId ? navigate to home '/'
      //? resp.deviceId !== localDeviceId ? cache resp.deviceId (then) mfa.init()
      //? have user enter their code: then: /authenticatedLogin/
      //? if /authenticatedLogin/ resp is good then we login like normal
      return;
    }

    if (resp.type === 'expired password') {
      //? navigate to ('/change-password')
    }
  }

  render() {
    return html`${this.#loginForm.render()}`;
  }
}
