export {
  TokenName,
  Token
}

enum TokenName {
  // Some arithmetic operators
  MINUS, PLUS, SLASH, STAR, PERCNT,

  LPAREN, RPAREN, COMMA,

  // Literals
  IDENTIFIER, NUMBER,

  // Built-in functions
  CEIL, FLOOR, MIN, MAX, MEAN,

  EOF,
}

class Token {
  constructor(
    public readonly name: TokenName,
    public readonly lexeme: string = '',
  ) {}
}
