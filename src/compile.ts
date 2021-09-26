import { Parser } from './Parser';
import { RPNCalculator } from './RPNCalculator';

export {
  compile
};

const compile = (input: string): RPNCalculator => {
  const parser = new Parser(input);
  return new RPNCalculator(parser.parse().toArray())
}
