export { Stack };

class Stack<T> {
  constructor(
    private array: Array<T> = []
  ) {}

  empty(): boolean {
    return this.array.length <= 0;
  }

  size(): number {
    return this.array.length;
  }

  top(): T|undefined {
    return this.array[this.array.length - 1];
  }

  pop(): T|undefined {
    return this.array.pop();
  }

  push(item: T): number {
    return this.array.push(item);
  }

  toArray() {
    return [...this.array].reverse();
  }
}
