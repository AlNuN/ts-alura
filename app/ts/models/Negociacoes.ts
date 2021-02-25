import { Negociacao } from './Negociacao';

export class Negociacoes {
  private negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this.negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this.negociacoes);
  }
}
