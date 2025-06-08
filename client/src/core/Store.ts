class StoreOld<T> {
  #state = new Map<string, T>();

  set(key: string, value: T): void {
    this.#state.set(key, value);
  }

  get(key: string): T | undefined {
    return this.#state.get(key);
  }

  has(key: string): boolean {
    return this.#state.has(key);
  }
}

export class Store<S extends Record<string, any>> {
  #state = new Map<keyof S, S[keyof S]>();

  set<K extends keyof S>(key: K, value: S[K]) {
    this.#state.set(key, value);
  }

  get<K extends keyof S>(key: K): S[K] | undefined {
    return this.#state.get(key) as S[K] | undefined;
  }

  has<K extends keyof S>(key: K): boolean {
    return this.#state.has(key);
  }
}
