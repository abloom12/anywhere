class TrieNode {
  children: Map<string, TrieNode>;
  dynamicChild?: TrieNode;
  isComplete: boolean;

  constructor() {
    this.children = new Map();
    this.isComplete = false;
  }

  addChild(segment: string, isCompleted: boolean = false): TrieNode {
    if (!this.children.has(segment)) {
      this.children.set(segment, new TrieNode());
    }

    const childNode = this.children.get(segment)!;

    childNode.isComplete = childNode.isComplete || isCompleted;

    return childNode;
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
}

class Router {
  routeTrie;

  constructor() {
    this.routeTrie = new Trie();
  }

  #matchRoute() {}

  // Public
  createRoute(route: { path: string }) {
    this.routeTrie.add(route);
  }

  navigate() {}
}

export { Router };
