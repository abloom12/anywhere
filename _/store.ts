import { node, shallowCompareObjects } from "@/util/index";

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
