class TrieNode {
  children: Map<string, TrieNode>;
  isComplete: boolean;
  dynamicChild?: [string, TrieNode];

  constructor() {
    this.children = new Map();
    this.isComplete = false;
  }

  addChild(segment: string, isCompleted: boolean = false): TrieNode {
    if (segment.startsWith(':')) {
      if (!this.dynamicChild) {
        this.dynamicChild = [segment, new TrieNode()];
      }

      this.dynamicChild[1].isComplete = this.dynamicChild[1].isComplete || isCompleted;

      return this.dynamicChild[1];
    }

    if (!this.children.has(segment)) {
      this.children.set(segment, new TrieNode());
    }

    const childNode = this.children.get(segment)!;

    childNode.isComplete = childNode.isComplete || isCompleted;

    return childNode;
  }

  getChild(segment: string): TrieNode | undefined {
    if (this.children.has(segment)) {
      return this.children.get(segment);
    }

    if (this.dynamicChild) {
      return this.dynamicChild[1];
    }

    return undefined;
  }
}

class Trie {
  head: TrieNode;

  constructor() {
    this.head = new TrieNode();
  }

  add({ path }: { path: string }) {
    const segments: string[] = path.split('/').filter((segment: string) => segment.length > 0);
    const segmentsLength = segments.length;
    let currentNode = this.head;

    for (let index = 0; index < segmentsLength; index++) {
      const isComplete = index === segmentsLength - 1;
      currentNode = currentNode.addChild(segments[index], isComplete);
    }
  }

  get(path: string): TrieNode | null {
    const segments: string[] = path.split('/').filter((segment: string) => segment.length > 0);
    let currentNode: TrieNode | undefined = this.head;

    for (const segment of segments) {
      currentNode = currentNode.getChild(segment);

      if (!currentNode) {
        return null;
      }
    }

    return currentNode;
  }

  print(node: TrieNode = this.head, prefix: string = '', isLast: boolean = true): void {
    const hasDynamicChild = !!node.dynamicChild;
    const totalChildrenCount = node.children.size + (hasDynamicChild ? 1 : 0);
    let index = 0;

    if (node === this.head) {
      console.log(`/`);
    }

    for (const [segment, childNode] of node.children) {
      const isLastChild = index === totalChildrenCount - 1 && !hasDynamicChild;
      const marker = childNode.isComplete ? '[Complete]' : '';

      console.log(`${prefix}${isLast ? '└── ' : '├── '}${segment} ${marker}`);

      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      this.print(childNode, newPrefix, isLastChild);

      index++;
    }

    if (hasDynamicChild) {
      const marker = node.dynamicChild![1].isComplete ? '[Complete]' : '';
      console.log(`${prefix}${isLast ? '└── ' : '├── '}${node.dynamicChild![0]} ${marker}`);
      this.print(node.dynamicChild![1], prefix + (isLast ? '    ' : '│   '), true);
    }
  }
}

type Middleware = (params: { next: Function; path: string }) => Promise<void> | void;

class Router {
  routeTrie: Trie = new Trie();
  middlewares: Array<Middleware> = [];

  constructor() {
    this.#init();
  }

  #init() {
    window.addEventListener('popstate', () => {
      this.#transitionRoute();
    });

    window.addEventListener('DOMContentLoaded', () => {
      [...document.querySelectorAll('a')].forEach(link => {
        link.removeEventListener('click', this.#linkHandler);
        link.addEventListener('click', this.#linkHandler);
      });
    });
  }
  #linkHandler(e: MouseEvent) {
    if ((e.ctrlKey || e.metaKey) && e.target instanceof HTMLElement && e.target.tagName.toLowerCase() === 'a') {
      return false;
    }

    let location = e.target instanceof HTMLElement && e.target.getAttribute('href');
    if (typeof location === 'undefined' || location === null) {
      return false;
    }

    if (typeof location === 'string' && location.match(/^(http|https)/) && typeof URL !== 'undefined') {
      try {
        const u = new URL(location);
        location = u.pathname + u.search;
      } catch (err) {}
    }

    e.preventDefault();
    e.stopPropagation();

    if (typeof location === 'string') {
      this.navigate(location);
    }
  }

  async #transitionRoute(): Promise<void> {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = url.search;

    const match = this.routeTrie.get(path);

    const runMiddlewares = async (index: number): Promise<void> => {
      if (index < this.middlewares.length) {
        await this.middlewares[index]({
          next: async () => await runMiddlewares(index + 1),
          path,
        });
      }
    };

    await runMiddlewares(0);
  }

  // Public
  on(route: { path: string }) {
    this.routeTrie.add(route);

    // children.forEach((childRoute) => {
    //   const childPath = `${path}${childRoute.path}`;
    //   this.createRoute({ ...childRoute, path: childPath });
    // });
  }
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }
  navigate(url: string) {
    history.pushState(null, '', url);
    this.#transitionRoute();
  }
  visualizeTrie() {
    this.routeTrie.print();
  }
}

export { Router };
