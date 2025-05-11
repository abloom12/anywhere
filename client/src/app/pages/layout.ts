import { Layout } from '@/core/Layout';
import { html } from '@/core/html';

export default class RootLayout extends Layout {
  constructor() {
    super();
  }

  render() {
    return html`<div data-outlet></div>`;
  }
}
