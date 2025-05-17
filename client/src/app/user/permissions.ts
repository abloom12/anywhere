export class Permissions<T> {
  private store = new Map<string, T>();

  constructor(initial?: Record<string, T>) {
    if (initial) {
      for (const [key, value] of Object.entries(initial)) {
        this.set(key, value);
      }
    }
  }

  set(key: string, value: T): void {
    if (this.store.has(key)) {
      throw new Error(
        `Key "${key}" is already set and cannot be changed.`,
      );
    }
    this.store.set(key, value);
  }

  get(key: string): T | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }
}
