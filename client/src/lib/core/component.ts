abstract class Component {
  protected rootElement: DocumentFragment;

  constructor() {
    this.rootElement = document.createDocumentFragment();
  }

  protected abstract render(): void;

  appendTo(node: HTMLElement): void {
    node.appendChild(this.rootElement);
  }
}

export { Component };
