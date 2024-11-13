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

function html(strings: TemplateStringsArray, ...values: any[]): HTMLElement {
  const placeholders: any[] = [];
  let htmlString = '';

  for (let i = 0; i < strings.length; i++) {
    htmlString += strings[i];

    if (i < values.length) {
      const value = values[i];

      if (value instanceof HTMLElement) {
        htmlString += `<!--__placeholder_${i}__-->`;
        placeholders.push({ index: i, node: value });
      } else {
        htmlString += value;
      }
    }
  }

  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();

  if (placeholders.length > 0) {
    const walker = document.createTreeWalker(
      template.content,
      NodeFilter.SHOW_COMMENT,
      null,
    );

    let comment: Comment | null;
    while ((comment = walker.nextNode() as Comment | null)) {
      const match = /__placeholder_(\d+)__/.exec(comment.data);
      if (match) {
        const index = parseInt(match[1], 10);
        const placeholder = placeholders.find(p => p.index === index);
        if (placeholder) {
          comment.parentNode?.replaceChild(placeholder.node, comment);
        }
      }
    }
  }

  return template.content.firstElementChild as HTMLElement;
}

function stringToElement_TEMPLATE(htmlString: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild as HTMLElement;
}

function stringToElement_RANGE(htmlString: string): HTMLElement {
  const range = document.createRange();
  range.selectNode(document.body); // Required in some browsers
  const fragment = range.createContextualFragment(htmlString.trim());
  return fragment.firstElementChild as HTMLElement;
}

function stringToElement_DOMPARSER(htmlString: string): HTMLElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString.trim(), 'text/html');
  return doc.body.firstElementChild as HTMLElement;
}

export { Component };
