export type { Token };

type TokenName = 'LPAREN' | 'RPAREN' | 'OP' | 'DIGITS' | 'VAR';

interface Token {
  name: TokenName;
  value: string;
};
