type Listener<T = any> = (payload: T) => void;

export class EventBus {
  private handlers: Map<string, Set<Listener>> = new Map();

  on<T = any>(event: string, listener: Listener<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(listener as Listener);

    return () => {
      this.off(event, listener);
    };
  }

  once<T = any>(event: string, listener: Listener<T>): () => void {
    const wrapper = (payload: T) => {
      listener(payload);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  off<T = any>(event: string, listener: Listener<T>) {
    const set = this.handlers.get(event);
    if (set) {
      set.delete(listener as Listener);
      if (set.size === 0) {
        this.handlers.delete(event);
      }
    }
  }

  emit<T = any>(event: string, payload?: T) {
    const set = this.handlers.get(event);
    if (set) {
      Array.from(set).forEach(listener => {
        listener(payload!);
      });
    }
  }
}
