export abstract class Page {
  protected rootElement: DocumentFragment;

  constructor() {
    this.rootElement = document.createDocumentFragment();
  }

  protected abstract render(): void;

  protected mount() {
    //TODO: instead let the router pass the #app element
    // const appRootElement = document.querySelector('#app');
    // appRootElement!.innerHTML = '';
    // appRootElement!.append(this.rootElement);
  }
}

//* PAGE STARTER CLASS
// import { Page } from '@/core/Page';
// import { html } from '@/core/html';

// export default class TEMPLATE extends Page {
//   constructor() {
//     super();
//   }

//   render() {
//     const layout = html` <h1>TEMPLATE Page</h1> `;
//     this.rootElement.append(layout);
//   }
// }
