import { Parser } from './Parser';
import { Stack } from './Stack';
import { MathNode } from './MathNode';

export {
  compile
};

interface EvalFunction {
  evaluate(scope?: Record<string, number>): number;
}

const compile = (input: string): EvalFunction => {
  const parser = new Parser(input);
  const rpn = parser.parse();
  const stack = new Stack<MathNode.Node>();

  function evaluate(scope?: Record<string, number>) {
    while (!rpn.empty()) {
      const node = rpn.pop();

      if (node instanceof MathNode.Operand) {
        // TODO
      }

      if (node instanceof MathNode.Operator) {
        // TODO
      }

      if (node instanceof MathNode.Variable) {
        // TODO
      }

      throw new Error('Unrecognized node');
    }

    if (stack.empty()) {
      throw new Error('Stack is empty after evaluating');
    }

    const operand = stack.pop()!;
    if (operand instanceof MathNode.Operand) {
      return operand.value;
    } else {
      throw new Error('Failed to evaluate express');
    }
  }
}
