export class Queue<T = any> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | null {
    if (this.items.length > 0) {
      return this.items.shift();
    }
    return null;
  }
}
