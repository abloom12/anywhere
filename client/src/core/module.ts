abstract class Module {
  protected rootElement: DocumentFragment;
  protected state: {};

  constructor() {
    this.rootElement = document.createDocumentFragment();
    this.state = {};
  }

  protected abstract render(): void;
}

export { Module };
