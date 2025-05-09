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

      this.dynamicChild[1].isComplete =
        this.dynamicChild[1].isComplete || isCompleted;

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

  add(path: string) {
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

  print(
    node: TrieNode = this.head,
    prefix: string = '',
    isLast: boolean = true,
  ): void {
    const hasDynamicChild = !!node.dynamicChild;
    const totalChildrenCount =
      node.children.size + (hasDynamicChild ? 1 : 0);
    let index = 0;

    if (node === this.head) {
      console.log(`/`);
    }

    for (const [segment, childNode] of node.children) {
      const isLastChild =
        index === totalChildrenCount - 1 && !hasDynamicChild;
      const marker = childNode.isComplete ? '[Complete]' : '';

      console.log(
        `${prefix}${isLast ? '└── ' : '├── '}${segment} ${marker}`,
      );

      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      this.print(childNode, newPrefix, isLastChild);

      index++;
    }

    if (hasDynamicChild) {
      const marker =
        node.dynamicChild![1].isComplete ? '[Complete]' : '';
      console.log(
        `${prefix}${isLast ? '└── ' : '├── '}${node.dynamicChild![0]} ${marker}`,
      );
      this.print(
        node.dynamicChild![1],
        prefix + (isLast ? '    ' : '│   '),
        true,
      );
    }
  }
}

type Middleware = (params: {
  next: () => Promise<void>;
  path: string;
}) => Promise<void> | void;

type Loaders = Record<string, () => Promise<any>>;

type Route = {
  path: string;
  loader: () => Promise<any>;
  layouts: Map<string, () => Promise<any>>;
};

export class Router {
  routeTrie: Trie = new Trie();
  loaders: Loaders = {};
  middlewares: Middleware[] = [];
  currentRequestId: number = 0;
  rootElement: HTMLElement;
  basePath: string = '/';

  constructor(basePath: string, rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.basePath = basePath;

    window.addEventListener('popstate', () => {
      this.#transitionRoute();
    });

    window.addEventListener('DOMContentLoaded', () => {
      [...document.querySelectorAll('a')].forEach(link => {
        link.removeEventListener('click', this.#linkHandler);
        link.addEventListener('click', this.#linkHandler);
      });
    });

    this.#registerFileRoutes();
  }

  #linkHandler(e: MouseEvent) {
    if (
      (e.ctrlKey || e.metaKey) &&
      e.target instanceof HTMLElement &&
      e.target.tagName.toLowerCase() === 'a'
    ) {
      return false;
    }

    let location =
      e.target instanceof HTMLElement &&
      e.target.getAttribute('href');
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

  #registerFileRoutes() {
    const CAMEL_TO_DASH1 = /([a-z0-9])([A-Z])/g;
    const CAMEL_TO_DASH2 = /([A-Z])([A-Z][a-z])/g;
    const STRIP_LEADING = /^.*\/pages\//;
    const STRIP_TS_EXT = /\.ts$/;
    const GROUP_SEGMENT = /^\(.*\)$/;

    const layouts = import.meta.glob('/src/app/pages/**/layout.ts');
    const layoutMap = Object.fromEntries(
      Object.entries(layouts)
        .map(([filePath, loader]) => {
          const key = filePath
            .replace(/^.*\/pages/, '')
            .replace(/\/layout\.ts$/, '')
            .toLowerCase();

          return [key, loader] as const;
        })
        .sort(([a], [b]) => a.length - b.length),
    );

    const pages = import.meta.glob([
      '/src/app/pages/**/!(*layout).ts',
      '!/src/app/pages/404.ts',
    ]);

    for (const [filePath, loader] of Object.entries(pages)) {
      // Parse File Path
      const parts = filePath
        .replace(STRIP_LEADING, '')
        .replace(STRIP_TS_EXT, '')
        .toLowerCase()
        .split('/');

      const fileName = parts.pop()!;
      const segments =
        fileName === 'index' ? parts : [...parts, fileName];

      // Grab Layouts for Route
      let segment = '';
      const layouts = new Map<string, () => Promise<any>>();
      for (let index = 0; index < segments.length; index++) {
        segment += `/${segments[index]}`;

        const layoutLoader = layoutMap[segment];
        if (layoutLoader) {
          layouts.set(segment, layoutLoader);
        }
      }

      // Register with Router
      const path = `/${segments.filter(p => !GROUP_SEGMENT.test(p)).join('/')}`;
      this.routeTrie.add(path);
      this.loaders[path] = loader;

      console.log(path, loader);
      console.log(layouts);
    }
  }

  async #mountRoute(path: string, requestId: number) {
    const loader = this.loaders[path];
    if (!loader) {
      console.error(`No loader registered for ${path}`);
      return;
    }

    try {
      const module = await loader();
      if (requestId === this.currentRequestId) {
        //* This can be moved or added anywhere to check to see if request is still valid
        console.warn('Stale transition—aborting before mount:', path);
      }
      const PageClass = module.default;
      const page = new PageClass(); //? maybe pass the query data
      //TODO: start pre fetch (web worker)
      this.rootElement.innerHTML = '';
      this.rootElement.append(page.render());
    } catch (error) {
      console.log(`Failed to load route ${path}:`, error);
    }
  }

  async #transitionRoute(): Promise<void> {
    const requestId = ++this.currentRequestId;

    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = url.search;

    const match = this.routeTrie.get(path);
    if (!match) {
      console.error('No match found for:', path);
      //TODO: 404 not found page
      //const module = await import('@/app/pages/not-found.ts');
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

    if (requestId === this.currentRequestId) {
      //* This can be moved or added anywhere to check to see if request is still valid
      console.warn('Stale transition—aborting before mount:', path);
    }

    this.#mountRoute(path, requestId);
  }

  // Public
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
