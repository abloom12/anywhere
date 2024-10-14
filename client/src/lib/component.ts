abstract class Component {
  protected rootEle: DocumentFragment;

  constructor() {
    this.rootEle = document.createDocumentFragment();
  }

  protected abstract render(): void;

  appendTo(node: HTMLElement): void {
    node.appendChild(this.rootEle);
  }
}

export { Component };
