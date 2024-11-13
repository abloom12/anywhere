abstract class Component {
  protected rootElement: DocumentFragment;

  constructor() {
    this.rootElement = document.createDocumentFragment();
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

export { Component };

function html(strings: TemplateStringsArray, ...values: any[]): HTMLElement {
  // Combine the strings and values into a single HTML string
  let htmlString = strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? values[i] : '';
    return result + str + value;
  }, '');

  // Use the stringToElement function to convert the HTML string into an HTMLElement
  return stringToElement(htmlString);
}

function stringToElement(htmlString: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}
