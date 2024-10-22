type Subscriber<T> = {
  selector: (state: T) => any;
  listener: (selectedState: any) => void;
};

class Store<T> {
  #state: T;
  #subscriptions: Subscriber<T>[] = [];

  constructor(initialState: T, historyLimit: number = 100) {
    this.#state = initialState;
  }

  setState(newState: Partial<T>) {
    this.#state = { ...this.#state, ...newState };

    this.#subscriptions.forEach(({ selector, listener }) => {
      const selectedState = selector(this.#state);
      listener(selectedState);
    });
  }

  subscribe(
    selector: (state: T) => any,
    listener: (selectedState: any) => void,
  ) {
    const subscriber = {
      selector,
      listener,
    };

    this.#subscriptions.push(subscriber);

    return () => {
      this.#subscriptions = this.#subscriptions.filter(
        sub => sub !== subscriber,
      );
    };
  }
}

export { Store };
