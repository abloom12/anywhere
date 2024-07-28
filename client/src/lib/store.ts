//TODO: need a way to get state, either entire state obj or use a selector
//TODO: do we want to use some form of actions? reducer?

import { produce } from "immer";
//import { createSelector } from "reselect";
import { log } from "@/util/logger";

function shallowEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let i = 0; i < keys1.length; i++) {
    if (obj1[keys1[i]] !== obj2[keys1[i]]) return false;
  }

  return true;
}

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

type StoreMethods = {
  setState: (
    producer: (draft: State) => void | Array<(draft: State) => void>
  ) => void;
  subscribe: <T>(
    selector: SelectorFunction<T>,
    listener: ListenerFunction<T>
  ) => () => void;
  undo: () => void;
  redo: () => void;
  resetState: (defaultState?: State) => void;
};

type Subscription<T> = {
  selector: SelectorFunction<T>;
  listener: ListenerFunction<T>;
  previousSelection: { current: T };
};

function createStore(
  initialState: State,
  historyLimit: number = 100
): StoreMethods {
  let state = initialState;
  let subscriptions: Array<Subscription<any>> = [];
  let head = node(initialState);
  let current = head;
  let tail = head;
  let size = 1;

  function subscribe<T>(
    selector: (state: State) => T,
    listener: (selectedState: T) => void
  ) {
    log("subscribe fired");
    const selectedState = selector(state);
    const previousSelection = { current: selectedState };

    subscriptions.push({
      selector,
      listener,
      previousSelection,
    });

    return () => {
      const index = subscriptions.findIndex((s) => s.listener === listener);
      if (index > -1) {
        subscriptions.splice(index, 1);
      }
    };
  }

  function setState(
    producer: (draft: State) => void | Array<(draft: State) => void>
  ): void {
    log("setstate fired");
    const newState = produce(state, (draft) => {
      if (Array.isArray(producer)) {
        producer.forEach((fn) => fn(draft));
      } else {
        producer(draft);
      }
    });

    const newStateNode = node(newState);
    newStateNode.prev = current;

    current.next = newStateNode;
    current = newStateNode;

    tail = current;
    state = current.state;

    if (size === historyLimit) {
      head = head.next!;
      head.prev = null;
    } else {
      size++;
    }

    subscriptions.forEach(({ selector, listener, previousSelection }) => {
      log("setstate listener fired");
      const selectedState = selector(state);
      if (!shallowEqual(previousSelection.current, selectedState)) {
        listener(selectedState);
        previousSelection.current = selectedState;
      }
    });
  }

  function resetState(defaultState?: State) {
    const newState = defaultState ?? initialState;
    state = newState;
    head = node(newState);
    current = head;
    tail = head;
    size = 1;

    subscriptions.forEach(({ selector, listener }) => {
      listener(selector(state));
    });
  }

  function redo() {
    if (current.next !== null) {
      current = current.next;
      state = current.state;
      size++;

      subscriptions.forEach(({ selector, listener }) => {
        listener(selector(state));
      });
    }
  }

  function undo() {
    if (current.prev !== null) {
      current = current.prev;
      state = current.state;
      size--;

      subscriptions.forEach(({ selector, listener }) => {
        listener(selector(state));
      });
    }
  }

  return {
    subscribe,
    setState,
    resetState,
    redo,
    undo,
  };
}

export { createStore };
