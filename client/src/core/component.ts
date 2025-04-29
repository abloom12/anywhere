export abstract class Component {
  protected rootElement: DocumentFragment;

  constructor() {
    this.rootElement = document.createDocumentFragment();
  }

  get element() {
    return this.rootElement;
  }

  protected abstract render(): void;

  protected useState<T extends object>(initialState: T): T {
    const state = new Proxy(initialState, {
      set(target: T, prop: PropertyKey, value: any): boolean {
        target[prop as keyof T] = value;
        return true;
      },
    });

    return state;
  }

  appendTo(node: HTMLElement): void {
    node.appendChild(this.rootElement);
  }
}
