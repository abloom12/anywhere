class TrieNode {
  children: Map<string, TrieNode>;
  isComplete: boolean;
  segment: string;
  dynamicChild?: TrieNode;

  constructor(segment: string) {
    this.children = new Map();
    this.isComplete = false;
    this.segment = segment;
  }

  addChild(segment: string, isCompleted: boolean = false): TrieNode {
    if (segment.startsWith(':')) {
      if (!this.dynamicChild) {
        this.dynamicChild = new TrieNode(segment);
      }

      this.dynamicChild.isComplete = this.dynamicChild.isComplete || isCompleted;

      return this.dynamicChild;
    }

    if (!this.children.has(segment)) {
      this.children.set(segment, new TrieNode(segment));
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
      return this.dynamicChild;
    }

    return undefined;
  }
}

class Trie {
  head: TrieNode;

  constructor() {
    this.head = new TrieNode('root');
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
      console.log(`${this.head.segment}`);
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
      const marker = node.dynamicChild!.isComplete ? '[Complete]' : '';
      // const dynamicKey = node.dynamicChild!.dynamicKey || ':dynamic';
      console.log(`${prefix}${isLast ? '└── ' : '├── '}${node.dynamicChild?.segment} ${marker}`);
      this.print(node.dynamicChild!, prefix + (isLast ? '    ' : '│   '), true);
    }
  }
}

class Router {
  routeTrie: Trie;

  constructor() {
    this.routeTrie = new Trie();
  }

  #links() {
    //TODO: need to decide how I want to do this
    //? if we build nav manually in index.html then we should:
    //- query select nav container, add event listener to that
    //? if we build nav via JS as apart of the root view then we should
    //- just do same as above minus the query select need
  }
  #transitionRoute() {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const query = url.search;
    console.log(url);

    const match = this.routeTrie.get(path);
    console.log(match);
  }

  // Public
  createRoute(route: { path: string }) {
    this.routeTrie.add(route);
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
