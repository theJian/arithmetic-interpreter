export { Queue };

class Queue<T> {
  constructor(
    private array: Array<T> = []
  ) {}

  empty(): boolean {
    return this.array.length <= 0;
  }

  size(): number {
    return this.array.length;
  }

  pop(): T|undefined {
    return this.array.shift();
  }

  push(item: T): number {
    return this.array.push(item);
  }

  toArray() {
    return [...this.array];
  }
}
