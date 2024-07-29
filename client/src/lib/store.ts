//TODO: need a way to get state, either entire state obj or use a selector
//TODO: do we want to use some form of actions? reducer?

import { produce } from "immer";
//import { createSelector } from "reselect";
import { node, shallowCompareObjects } from "@/util";
import { log } from "@/util/logger";

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

// type Middleware = (params: {
//   next: Function;
//   path: string;
//   query: { [key: string]: string };
// }) => Promise<void> | void;

function createStore(
  initialState: State,
  historyLimit: number = 100
): StoreMethods {
  let state = initialState;
  const subscriptions: Array<Subscription<any>> = [];
  //const middlewares: Array<Middleware> = [];
  // history
  let head = node(initialState);
  let current = head;
  let tail = head;
  let size = 1;

  // Public APIs
  //----------------------------
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
      if (!shallowCompareObjects(previousSelection.current, selectedState)) {
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
