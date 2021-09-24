export { Operator };

namespace Operator {
  interface Operator {
    literal: string|string[];
    associativity: Associativity;
    precedence: number;
    call: (left: number, right: number) => number|never;
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
    call: function (left, right) { return left + right; }
  };

  export const Subtraction: Operator = {
    literal: '-',
    associativity: Associativity.Left,
    precedence: 2,
    call: function (left, right) { return left - right; }
  };

  export const Multiplication: Operator = {
    literal: '*',
    associativity: Associativity.Left,
    precedence: 3,
    call: function (left, right) { return left * right; }
  };

  export const Division: Operator = {
    literal: '/',
    associativity: Associativity.Left,
    precedence: 3,
    call: function (left, right) { return left / right; }
  };

  export const Remainder: Operator = {
    literal: '%',
    associativity: Associativity.Left,
    precedence: 3,
    call: function (left, right) { return left % right; }
  }
}

