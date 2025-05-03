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
    const segments: string[] = path
      .split('/')
      .filter((segment: string) => segment.length > 0);
    const segmentsLength = segments.length;
    let currentNode = this.head;

    for (let index = 0; index < segmentsLength; index++) {
      const isComplete = index === segmentsLength - 1;
      currentNode = currentNode.addChild(segments[index], isComplete);
    }
  }

  get(path: string): TrieNode | null {
    const segments: string[] = path
      .split('/')
      .filter((segment: string) => segment.length > 0);
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
      console.log(
        `${prefix}${isLast ? '└── ' : '├── '}${node.dynamicChild![0]} ${marker}`,
      );
      this.print(node.dynamicChild![1], prefix + (isLast ? '    ' : '│   '), true);
    }
  }
}

type Middleware = (params: {
  next: (index: number) => Promise<void>;
  path: string;
}) => Promise<void> | void;

type Loaders = Record<string, () => Promise<any>>;

type Route = {
  path: string;
  loader: () => Promise<any>;
};

export class Router {
  routeTrie: Trie = new Trie();
  loaders: Loaders = {};
  middlewares: Middleware[] = [];

  constructor(basePath: string) {
    window.addEventListener('popstate', () => {
      this.#transitionRoute();
    });

    window.addEventListener('DOMContentLoaded', () => {
      [...document.querySelectorAll('a')].forEach(link => {
        link.removeEventListener('click', this.#linkHandler);
        link.addEventListener('click', this.#linkHandler);
      });
    });

    //this.#transitionRoute();
  }

  #linkHandler(e: MouseEvent) {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.target instanceof HTMLElement &&
      e.target.tagName.toLowerCase() === 'a'
    ) {
      return false;
    }

    let location = e.target instanceof HTMLElement && e.target.getAttribute('href');
    if (typeof location === 'undefined' || location === null) {
      return false;
    }

    if (
      typeof location === 'string' &&
      location.match(/^(http|https)/) &&
      typeof URL !== 'undefined'
    ) {
      try {
        const u = new URL(location);
        location = u.pathname + u.search;
      } catch (error) {
        console.error(error);
      }
    }

    e.preventDefault();
    e.stopPropagation();

    if (typeof location === 'string') {
      this.navigate(location);
    }
  }

  async #mountRoute(path: string) {
    const loader = this.loaders[path];
    if (!loader) {
      console.error(`No loader registered for ${path}`);
      return;
    }

    try {
      const module = await loader();
      const PageClass = module.default;
      const page = new PageClass(); //? maybe pass the query data
      page.mount();
      //TODO: make sure we clean up the root outlet before appending new page
    } catch (error) {
      console.log(`Failed to load route ${path}:`, error);
    }
  }

  async #transitionRoute(): Promise<void> {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = url.search;

    const match = this.routeTrie.get(path);
    if (!match) {
      console.error('No match found for:', path);
      //TODO: should show a 404 page here
    }

    const runMiddlewares = async (index: number): Promise<void> => {
      if (index < this.middlewares.length) {
        await this.middlewares[index]({
          next: async () => await runMiddlewares(index + 1),
          path,
        });
      }
    };

    await runMiddlewares(0);

    this.#mountRoute(path);
  }

  // Public
  on(route: Route) {
    this.routeTrie.add(route);
    this.loaders[route.path] = route.loader;
  }
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }
  async navigate(url: string) {
    history.pushState(null, '', url);
    await this.#transitionRoute();
  }
  visualizeTrie() {
    this.routeTrie.print();
  }
}
