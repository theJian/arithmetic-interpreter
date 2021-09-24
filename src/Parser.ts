import { TokenName, Token } from './Token';
import { Lexer } from './Lexer';
import { Queue } from './Queue';
import { Stack } from './Stack';
import { Operator } from './Operator';

export { Parser };

class Parser {
  private lexer: Lexer;
  private output: Queue<Token> = new Queue();
  private operators: Stack<Token> = new Stack();

  constructor(input: string) {
    this.lexer = new Lexer(input);
  }

  // `Parse` inplements shunting-yard algorithm parsing a math expression to RPN form, but it lacks a way to reject invalid expressions intrinsically
  // TODO: validate expression
  parse() {
    while (true) {
      const token = this.lexer.nextToken();
      if (token.name === TokenName.EOF) break; // reach the end of input

      switch (token.name) {
        case TokenName.NUMBER:
          this.output.push(token);
          break;

        case TokenName.CEIL:
        case TokenName.FLOOR:
        case TokenName.MIN:
        case TokenName.MAX:
        case TokenName.MEAN:
          this.operators.push(token);
          break;

        case TokenName.LPAREN:
          this.operators.push(token);
          break;

        case TokenName.RPAREN:
          this.popGrouping();
          break;

        case TokenName.MINUS:
        case TokenName.PLUS:
        case TokenName.SLASH:
        case TokenName.STAR:
        case TokenName.PERCNT:
          this.pushOperator(token);
          break;

        default:
          throw new Error(`Unexpected token ${token.lexeme}`);
      }
    }

    while (!this.operators.empty()) {
      const token = this.operators.pop()!;
      if (token.name === TokenName.LPAREN) {
        throw new Error('Mismatched parentheses');
      }
      this.output.push(token);
    }

    return this.output;
  }

  private popGrouping() {
    // Push operators to output until we reach an associated left parenthese
    while (!this.operators.empty() && this.operators.top()!.name !== TokenName.LPAREN) {
      this.output.push(this.operators.pop()!);
    }

    // Mismatched parentheses
    if (this.operators.empty()) {
      throw new Error('Mismatched parentheses');
    }

    // Pop and discard the left parenthese on the top
    this.operators.pop();

    const token = this.operators.top();
    if (
      token?.name === TokenName.CEIL  ||
      token?.name === TokenName.FLOOR ||
      token?.name === TokenName.MIN   ||
      token?.name === TokenName.MAX   ||
      token?.name === TokenName.MEAN
    ) {
      this.output.push(token);
    }
  }

  private pushOperator(token: Token) {
    while (
      !this.operators.empty() &&
      this.operators.top()!.name !== TokenName.LPAREN &&
      (
        // If (1) operation on top has higher precedence
        this.comparePrecedence(token, this.operators.top()!) < 0 ||
        // Or (2) the precendence is the same but token is left associative
        (
          this.comparePrecedence(token, this.operators.top()!) === 0 &&
          this.getAssociatedOperator(token).associativity === Operator.Associativity.Left
        )
      )
    ) {
      this.output.push(this.operators.pop()!);
    }
    this.operators.push(token);
  }

  /**
   * Compare precedence between two Token
   *   return zero if t1 and t2 have the same precedence;
   *   return positive if t1 has higher precedence;
   *   return negative if t1 has lower precedence;
   */
  private comparePrecedence(t1: Token, t2: Token) {
    return this.getAssociatedOperator(t1).precedence - this.getAssociatedOperator(t2).precedence;
  }

  private getAssociatedOperator(token: Token) {
    switch (token.name) {
      case TokenName.PLUS: return Operator.Addition;
      case TokenName.MINUS: return Operator.Subtraction;
      case TokenName.STAR: return Operator.Multiplication;
      case TokenName.SLASH: return Operator.Division;
      case TokenName.PERCNT: return Operator.Remainder;
      default: throw new Error(`Token ${token.name} has no associated operation`);
    }
  }
}
