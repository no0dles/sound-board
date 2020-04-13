export class EventEmitter<T> {
  private listeners: EventListener<T>[] = [];

  currentEvent: T | null;

  addListener(listener: EventListener<T>) {
    this.listeners.push(listener);
  }

  removeListener(listener: EventListener<T>) {
    const index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  dispatchEvent(event: T) {
    this.currentEvent = event;
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

export type EventListener<T = any> = (event: T) => void;
