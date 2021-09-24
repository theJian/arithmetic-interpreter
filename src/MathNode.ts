export { MathNode }

namespace MathNode {
  export class Operand {
    constructor(
      public readonly value: number
    ) {}
  }

  export class Operator {
    constructor(
      public readonly apply: (a: number, b: number) => number
    ) {}
  }

  export class Variable {
    constructor(
      public readonly name: string
    ) {}

    subs(values: Record<string, number>): number|never {
      if (!values.hasOwnProperty(this.name)) {
        throw new Error(`Missing value for variable "${this.name}"`);
      }

      return values[this.name];
    }
  }
}
