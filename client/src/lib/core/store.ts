type Node<T> = {
  state: T;
  prev: Node<T> | null;
  next: Node<T> | null;
};

function node<T>(state: T): Node<T> {
  return {
    state,
    prev: null,
    next: null,
  };
}

type State = Record<string, any>;
type ListenerFunction<T> = (selectedState: T) => void;
type SelectorFunction<T> = (state: State) => T;

class Store {
  #state: State = {};
  #head: {} = {};
  #current: {} = {};
  #tail: {} = {};
  #size: number = 1;

  constructor(initialState: State, historyLimit: number = 100) {
    this.#state = initialState;
    this.#head = node(initialState);
  }
}

export { Store };
