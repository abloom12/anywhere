import { Layout } from '@/core/Layout';
import { html } from '@/core/html';

export default class SiteLayout extends Layout {
  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <div>Header</div>
        <div data-outlet></div>
      </div>
    `;
  }
}
