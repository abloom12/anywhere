abstract class Component<P> {
  protected rootEle: DocumentFragment;
  protected props: P;

  constructor(dirtyProps: P) {
    this.rootEle = document.createDocumentFragment();
    this.props = this.handleProps(dirtyProps);
    this.render();
  }

  protected abstract handleProps(dirtyProps: P): P;

  protected abstract render(): void;

  appendTo(node: HTMLElement): void {
    node.appendChild(this.rootEle);
  }
}

export { Component };
