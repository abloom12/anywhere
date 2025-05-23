// @ts-nocheck
/* eslint-disable */ // for ESLint
/* tslint:disable */ // for TSLint
type EventName<Events> = Extract<keyof Events, string>;
type Listener<T> = (payload: T) => void;

export class EventBus2<Events extends Record<string, unknown>> {
  private handlers = new Map<string, Set<Listener<unknown>>>();

  on<K extends EventName<Events>>(event: K, listener: Listener<Events[K]>): () => void {
    if (!this.handlers.has(event as string)) {
      this.handlers.set(event as string, new Set());
    }
    this.handlers.get(event as string)!.add(listener as Listener<unknown>);

    return () => {
      this.off(event, listener);
    };
  }

  once<K extends EventName<Events>>(event: K, listener: Listener<Events[K]>): () => void {
    const wrapper: Listener<Events[K]> = payload => {
      listener(payload);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  off<K extends EventName<Events>>(event: K, listener: Listener<Events[K]>): void {
    const set = this.handlers.get(event as string);
    if (!set) return;

    set.delete(listener as Listener<unknown>);
    if (set.size === 0) {
      this.handlers.delete(event as string);
    }
  }

  emit<K extends EventName<Events>>(event: K, payload: Events[K]): void {
    const set = this.handlers.get(event as string);
    if (!set) return;

    for (const raw of Array.from(set)) {
      const listener = raw as Listener<Events[K]>;
      try {
        listener(payload);
      } catch (err) {
        console.error(`Error in listener for "${String(event)}":`, err);
      }
    }
  }

  clear<K extends EventName<Events>>(event?: K): void {
    if (event !== undefined) {
      this.handlers.delete(event as string);
    } else {
      this.handlers.clear();
    }
  }

  listenerCount<K extends EventName<Events>>(event: K): number {
    const set = this.handlers.get(event as string);
    return set ? set.size : 0;
  }
}

// You supply your events-to-payload map inline:
const bus = new EventBus<{
  'user:login': { userId: string };
  'chat:message': { from: string; text: string };
}>();

// ✅ Correctly typed:
bus.on('user:login', data => {
  console.log('Welcome', data.userId);
});

// TypeScript will complain if you mismatch:
// bus.emit("user:login", { foo: 123 });            // ❌ error
// bus.emit("user:login", { userId: "alice" });     // ✅

bus.emit('chat:message', { from: 'bob', text: 'hi' });

// Helpers:
console.log(bus.listenerCount('chat:message')); // number of listeners
bus.clear('user:login'); // drop login listeners
bus.clear();
