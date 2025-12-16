class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    if (typeof event !== "string" || !event)
      throw new Error("Event name must be a non-empty string");
    if (typeof handler !== "function") throw new Error("Handler must be a function");

    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(handler);

    return this;
  }

  off(event, handler) {
    if (typeof event !== "string" || !event)
      throw new Error("Event name must be a non-empty string");

    if (!handler) {
      this.events.delete(event);
    } else {
      const handlers = this.events.get(event);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) this.events.delete(event);
      }
    }

    return this;
  }

  emit(event, ...args) {
    if (typeof event !== "string" || !event)
      throw new Error("Event name must be a non-empty string");

    const handlers = this.events.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(...args);
        } catch (e) {
          console.error(`Error in handler for event "${event}":`, e);
        }
      }
    }

    return this;
  }

  clear(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
    return this;
  }
}

export default EventEmitter;
