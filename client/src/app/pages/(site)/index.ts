import { Page } from '@/core/Page';
import { html } from '@/core/html';

export default class DashboardPage extends Page {
  constructor() {
    super();
  }

  render() {
    return html`<h1>Dashboard Page</h1>`;
  }
}
