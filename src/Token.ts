export type { Token };

type TokenType = 'LPAREN' | 'RPAREN' | 'OP' | 'DIGITS' | 'VAR';

interface Token {
  type: TokenType;
  value: string;
};
