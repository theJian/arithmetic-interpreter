import { Token, TokenName } from './Token'

export { Lexer };

class Lexer {
  private current: number = 0;
  private start: number = 0;

  constructor(
    private input: string,
  ) {}

  /**
   * Return the next token
   */
  nextToken(): Token {
    let c = this.advance();
    while(/\s/.test(c)) c = this.advance(); // Getting the next non-whitespace character

    this.start = this.current;
    switch (c) {
      case '-': return new Token(TokenName.MINUS);
      case '+': return new Token(TokenName.PLUS);
      case '/': return new Token(TokenName.SLASH);
      case '*': return new Token(TokenName.STAR);
      case '(': return new Token(TokenName.LPAREN);
      case ')': return new Token(TokenName.RPAREN);
      case '\0': return new Token(TokenName.EOF);
      default:
        if (/\d/.test(c)) return this.number();
        if (/[$A-Za-z_]/.test(c)) return this.identifier();
        throw new Error(`Unexpected token '${c}'`)
    }
  }

  private identifier(): Token {
    while(this.match(/[$A-Za-z0-9_]/));
    return new Token(TokenName.NUMBER, this.input.slice(this.start, this.current));
  }

  private number(): Token {
    while (this.match(/\d/));

    if (this.peek() === '.') {
      this.advance(); // consume the "."
      while (this.match(/\d/));
    }

    return new Token(TokenName.NUMBER, this.input.slice(this.start, this.current));
  }

  /**
   * Return if the cursor has reached the end of input
   */
  private isAtEnd(): boolean {
    return this.current >= this.input.length;
  }

  /**
   * Skip the next character if it matches the expected, return whether the next character matches
   */
  private match(expected: string|RegExp): boolean {
    if (this.isAtEnd()) return false;
    if (typeof expected === 'string' && this.peek() !== expected) return false;
    if (expected instanceof RegExp && !expected.test(this.peek())) return false;
    this.advance();
    return true;
  }

  /**
   * Return the next character of the input string
   */
  private advance(): string{
    if (this.isAtEnd()) return '\0';
    return this.input.charAt(this.current++)
  }

  /**
   * Like `advance` but it doesn't consume the character
   */
  private peek(): string {
    if (this.isAtEnd()) return '\0';
    return this.input.charAt(this.current);
  }
}
