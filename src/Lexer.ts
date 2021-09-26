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
    while (/\s/.test(this.peek())) this.advance(); // Skip whitespace characters
    this.start = this.current; // Save the current index before lexing

    const c = this.advance();
    switch (c) {
      case '-': return new Token(TokenName.MINUS);
      case '+': return new Token(TokenName.PLUS);
      case '/': return new Token(TokenName.SLASH);
      case '*': return new Token(TokenName.STAR);
      case '(': return new Token(TokenName.LPAREN);
      case ')': return new Token(TokenName.RPAREN);
      case ',': return new Token(TokenName.COMMA);
      case '%': return new Token(TokenName.PERCNT);
      case '\0': return new Token(TokenName.EOF);
      default:
        if (/\d/.test(c)) return this.number();
        if (/[$A-Za-z_]/.test(c)) return this.identifier();
        throw new Error(`Unexpected token '${c}'`)
    }
  }

  private identifier(): Token {
    while (this.match(/[$A-Za-z0-9_]/));
    const lexeme = this.input.slice(this.start, this.current);
    const tokenName = builtIns[lexeme] || TokenName.IDENTIFIER;
    return new Token(tokenName, lexeme);
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

const builtIns: Record<string, TokenName> = {};
builtIns['ceil'] = TokenName.CEIL;
builtIns['floor'] = TokenName.FLOOR;
builtIns['min'] = TokenName.MIN;
builtIns['max'] = TokenName.MAX;
builtIns['mean'] = TokenName.MEAN;
