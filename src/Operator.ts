export { Operator };

namespace Operator {
  interface Operator {
    literal: string|string[];
    associativity: Associativity;
    precedence: number;
    apply: (left: number, right: number) => number|never;
  };

  export enum Associativity {
    Left,
    Right,
    None
  };

  export const Addition: Operator = {
    literal: '+',
    associativity: Associativity.Left,
    precedence: 2,
    apply: function (left, right) { return left + right; }
  };

  export const Subtraction: Operator = {
    literal: '-',
    associativity: Associativity.Left,
    precedence: 2,
    apply: function (left, right) { return left - right; }
  };

  export const Multiplication: Operator = {
    literal: '*',
    associativity: Associativity.Left,
    precedence: 3,
    apply: function (left, right) { return left * right; }
  };

  export const Division: Operator = {
    literal: '/',
    associativity: Associativity.Left,
    precedence: 3,
    apply: function (left, right) { return left / right; }
  };

  export const Remainder: Operator = {
    literal: '%',
    associativity: Associativity.Left,
    precedence: 3,
    apply: function (left, right) { return left % right; }
  }
}

