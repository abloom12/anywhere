class TrieNode {
  children: Map<string, TrieNode>;
  isComplete: boolean;
  dynamicChild?: TrieNode & { dynamicKey: string };

  constructor() {
    this.children = new Map();
    this.isComplete = false;
  }

  addChild(segment: string, isCompleted: boolean = false): TrieNode {
    if (segment.startsWith(':')) {
      if (!this.dynamicChild) {
        this.dynamicChild = Object.assign(new TrieNode(), {
          dynamicKey: segment.slice(1),
        }) as TrieNode & { dynamicKey: string };
      }

      this.dynamicChild.isComplete = this.dynamicChild.isComplete || isCompleted;

      return this.dynamicChild;
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
      return this.dynamicChild;
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
      const dynamicKey = node.dynamicChild!.dynamicKey || ':dynamic';
      console.log(`${prefix}${isLast ? '└── ' : '├── '}:${dynamicKey} ${marker}`);
      this.print(node.dynamicChild!, prefix + (isLast ? '    ' : '│   '), true);
    }
  }
}

class Router {
  routeTrie;

  constructor() {
    this.routeTrie = new Trie();
  }

  #matchRoute(path: string) {}
  #transitionRoute() {}

  // Public
  createRoute(route: { path: string }) {
    this.routeTrie.add(route);
  }
  navigate(url: string) {
    history.pushState(null, '', url);
    const href = new URL(window.location.href);
    const path = href.pathname;
    const query = href.search;
    console.log(url, href);
    console.log(path);
    console.log(query);
  }
  visualizeTrie() {
    this.routeTrie.print();
  }
}

export { Router };
