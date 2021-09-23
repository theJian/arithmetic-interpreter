export {
  TokenName,
  Token
}

enum TokenName {
  MINUS, PLUS, SLASH, STAR,
  LPAREN, RPAREN,
  IDENTIFIER, NUMBER,
  EOF,
}

class Token {
  constructor(
    public readonly name: TokenName,
    public readonly lexeme: string = '',
  ) {}
}
