abstract class Component {
  protected rootElement: DocumentFragment;

  constructor() {
    this.rootElement = document.createDocumentFragment();
  }

  protected useState<T extends object>(initialState: T): T {
    const state = new Proxy(initialState, {
      set(target: T, prop: PropertyKey, value: any): boolean {
        target[prop as keyof T] = value;
        return true;
      },
    });

    return state;
  }

  protected abstract render(): void;

  appendTo(node: HTMLElement): void {
    node.appendChild(this.rootElement);
  }
}

export { Component };
