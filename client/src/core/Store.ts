export class Store<T> {
  private state = new Map<string, T>();

  constructor() {}

  set(key: string, value: T): void {
    this.state.set(key, value);
  }

  get(key: string): T | undefined {
    return this.state.get(key);
  }

  has(key: string): boolean {
    return this.state.has(key);
  }
}
