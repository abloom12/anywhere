import { Page as PageBase, PageModule } from './Page';
import { Layout as LayoutBase, LayoutModule } from './Layout';

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

  add(path: string) {
    if (path === '/') {
      this.head.isComplete = true;
      return;
    }

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
    if (path === '/') {
      return this.head.isComplete ? this.head : null;
    }

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

    if (!currentNode.isComplete) {
      return null;
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

type RouteLoader = {
  page: () => Promise<PageModule>;
  layouts: string[];
};
type RouteLoaders = Record<string, RouteLoader>;
type LayoutLoaders = Record<string, () => Promise<LayoutModule>>;
type Middleware = (params: {
  next: () => Promise<void>;
  path: string;
}) => Promise<void> | void;

export class Router {
  #rootElement: HTMLElement;
  #basePath: string = '/';

  #routeTrie: Trie = new Trie();
  #routeLoaders: RouteLoaders = {};
  #layoutLoaders: LayoutLoaders = {};
  #middlewares: Middleware[] = [];

  #currentRequestId: number = 0;
  #mountedChain: Array<{
    path: string;
    root: HTMLElement[];
    outlet: HTMLElement;
  }> = [];

  constructor(basePath: string, rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#basePath = basePath;

    window.addEventListener('popstate', () => {
      this.#transitionRoute();
    });

    window.addEventListener('DOMContentLoaded', () => {
      [...document.querySelectorAll('a')].forEach(link => {
        link.removeEventListener('click', this.#linkHandler);
        link.addEventListener('click', this.#linkHandler.bind(this));
      });
    });

    this.#registerFileRoutes();
    // this.#transitionRoute();
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

  #registerFileRoutes() {
    const layouts = import.meta.glob('/src/app/pages/**/layout.ts') as Record<
      string,
      (() => Promise<LayoutModule>) | undefined
    >;

    const pages = import.meta.glob([
      '/src/app/pages/**/!(*layout).ts',
      '!/src/app/pages/404.ts',
      '!/src/app/pages/not-found.ts',
    ]) as Record<string, () => Promise<PageModule>>;

    for (const [filePath, loader] of Object.entries(pages)) {
      // Parse File Path
      const parts = filePath
        .replace(/^.*\/pages\//, '')
        .replace(/\.ts$/, '')
        .toLowerCase()
        .split('/');

      const fileName = parts.pop()!;
      const segments = fileName === 'index' ? parts : [...parts, fileName];
      const path = `/${segments.filter(p => !/^\(.*\)$/.test(p)).join('/')}`;

      if (this.#routeLoaders[path]) {
        throw new Error(
          `Duplicate Routes: Multiple pages are trying to register to the same path: ${path}`,
        );
      }

      // Grab Layouts for Route
      const layoutPaths: string[] = [];

      if (Object.hasOwn(layouts, '/src/app/pages/layout.ts')) {
        layoutPaths.push('/');
        this.#layoutLoaders['/'] = layouts['/src/app/pages/layout.ts']!;
      }

      let layoutPathKey = '';
      for (let index = 0; index < parts.length; index++) {
        layoutPathKey += `/${parts[index]}`;

        const layoutFile = `/src/app/pages${layoutPathKey}/layout.ts`;
        const layoutLoader = layouts[layoutFile];

        if (layoutLoader) {
          this.#layoutLoaders[layoutPathKey] = layoutLoader;
          layoutPaths.push(layoutPathKey);
        }
      }

      // Register with Router
      this.#routeTrie.add(path);
      this.#routeLoaders[path] = {
        page: loader,
        layouts: layoutPaths,
      };
    }
  }

  async #mountRoute(path: string, requestId: number) {
    const loader = this.#routeLoaders[path];
    let parentElement: HTMLElement = this.#rootElement;

    try {
      for (let i = 0; i < loader.layouts.length; i++) {
        const layoutPath = loader.layouts[i];

        // Check for shared layout
        if (this.#mountedChain[i]?.path === layoutPath) {
          parentElement = this.#mountedChain[i].outlet;
          continue;
        }

        // Remove unused layouts
        if (this.#mountedChain[i]) {
          //? add unMount method to layout to clean up things like portals, modals or siblings
          this.#mountedChain[i].root!.forEach(n => n?.remove());
          this.#mountedChain.length = i;
        }

        const layoutLoader = this.#layoutLoaders[layoutPath];
        if (!layoutLoader) continue;

        const layoutModule: LayoutModule = await layoutLoader();
        const layoutClass: LayoutBase = new layoutModule.default();
        const layoutFrag: DocumentFragment = layoutClass.render();
        const nodes = Array.from(layoutFrag.childNodes) as HTMLElement[];
        parentElement.append(...nodes);

        const outlet = parentElement.querySelector<HTMLElement>('[data-outlet]');

        if (!outlet) {
          throw new Error(`Layout "${layoutPath}" needs a [data-outlet] element`);
        }

        parentElement = outlet;
        this.#mountedChain.push({
          path: layoutPath,
          root: nodes,
          outlet,
        });
      }

      // Clean up leftover, unused mounted layouts
      if (this.#mountedChain.length > loader.layouts.length) {
        for (let j = loader.layouts.length; j < this.#mountedChain.length; j++) {
          this.#mountedChain[j].root.forEach(n => n.remove());
        }

        this.#mountedChain.length = loader.layouts.length;
      }

      // Mount Page
      const pageModule: PageModule = await loader.page();
      const pageClass: PageBase = new pageModule.default();
      parentElement.innerHTML = '';
      parentElement.append(pageClass.render());
    } catch (error) {
      console.error(error);
    }
  }

  async #transitionRoute(): Promise<void> {
    const requestId = ++this.#currentRequestId;

    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = url.search;

    const match = this.#routeTrie.get(path);
    if (!match) {
      console.error('No match found for:', path);
      //TODO: 404 not found page
      // const module = await import('@/app/pages/not-found.ts');
      // this.#mountRoute('/not-found', requestId);
    }

    const runMiddlewares = async (index: number): Promise<void> => {
      if (index < this.#middlewares.length) {
        try {
          await this.#middlewares[index]({
            next: async () => await runMiddlewares(index + 1),
            path,
          });
        } catch (error) {
          console.error(`Middleware ${index} failed:`, error);
          await runMiddlewares(index + 1);
        }
      }
    };

    await runMiddlewares(0);

    if (requestId !== this.#currentRequestId) {
      console.warn('Stale transition—aborting before mount:', path);
      return;
    }

    this.#mountRoute(path, requestId);
  }

  // Public
  use(middleware: Middleware) {
    this.#middlewares.push(middleware);
  }

  async navigate(url: string) {
    history.pushState(null, '', url);
    await this.#transitionRoute();
  }

  visualizeTrie() {
    this.#routeTrie.print();
  }
}
