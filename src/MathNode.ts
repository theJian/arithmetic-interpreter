export { MathNode };

namespace MathNode {
  export type Node = Operand | Operator | Variable;

  export class Operand {
    constructor(
      public readonly value: number
    ) {}
  }

  export class Operator {
    constructor(
      public readonly arity: number,
      public readonly apply: (a: number, b: number) => number
    ) {}
  }

  export class Variable {
    constructor(
      public readonly name: string
    ) {}

    subs(scope: Record<string, number>): number|never {
      if (!scope.hasOwnProperty(this.name)) {
        throw new Error(`Missing value for variable "${this.name}"`);
      }

      return scope[this.name];
    }
  }
}
