type State = Record<string, any>;

type Component = new (...args: any[]) => {
  updateWithState: (state: any) => void;
};

type Subscription = {
  selector: (state: State) => any;
  listener: (selectedState: any) => void;
};

class Store {
  #state: State;
  #subscriptions: Subscription[] = [];
  #bindings: Map<string, Component[]> = new Map();

  constructor(initialState: State) {
    this.#state = new Proxy(initialState, {
      set(target, prop, value) {
        target[prop as string] = value;
        return true;
      },
    });
  }

  setState(newState: State) {
    //? do we want to create nwe obj every time?
    this.#state = { ...this.#state, ...newState };

    this.#subscriptions.forEach(({ selector, listener }) => {
      //? is there better way thay selector everytime?
      const selectedState = selector(this.#state);
      listener(selectedState);
    });
  }

  subscribe(
    selector: Subscription['selector'],
    listener: Subscription['listener'],
  ) {
    const subscription = {
      selector,
      listener,
    };

    this.#subscriptions.push(subscription);

    return () => {
      this.#subscriptions = this.#subscriptions.filter(
        sub => sub !== subscription,
      );
    };
  }

  bind(component: Component, path: string) {
    if (this.#bindings.has(path)) {
      this.#bindings.get(path)?.push(component);
    } else {
      this.#bindings.set(path, [component]);
    }
  }
}

export { Store };
