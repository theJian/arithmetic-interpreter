import type { Token } from './Token'

export { Lexer };

class Lexer {
  private cur: number = 0;

  constructor(
    private input: string,
  ) {}

  /**
   * Return the next character of the input string or undefined if we have reach the end
   */
  readChar(): string|undefined {
    if (this.cur >= this.input.length) return;
    const nextChar = this.input[this.cur];
    this.cur += 1;
    return nextChar;
  }

  /**
   * Return the next token or undefined if we have reach the end
   */
  getToken(): Token|undefined {
    let c = this.readChar(); // the next non-whitespace character
    while(c && /\s/.test(c)) c = this.readChar();
    if (!c) return;

    switch (c) {

    }
  }
}
