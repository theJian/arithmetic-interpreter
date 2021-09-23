import { Lexer } from './Lexer';

export { Parser };

class Parser {
  private lexer: Lexer;

  constructor(input: string) {
    this.lexer = new Lexer(input);
  }
}
