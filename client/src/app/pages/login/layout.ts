import { Layout } from '@/core/Layout';
import { html } from '@/core/html';

export default class LoginLayout extends Layout {
  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <div data-outlet></div>
      </div>
    `;
  }
}
