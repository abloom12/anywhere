import { Page } from '@/core/Page';
import { html } from '@/core/html';

export default class Login extends Page {
  constructor() {
    super();
  }

  render() {
    const layout = html`<h1>Login Page</h1>`;
    this.rootElement.append(layout);
  }
}
