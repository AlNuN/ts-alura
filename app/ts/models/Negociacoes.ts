import { Negociacao, MeuObjeto } from './index';

export class Negociacoes implements MeuObjeto<Negociacoes>{
  private negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this.negociacoes.push(negociacao);
  }

  paraArray(): Negociacao[] {
    return ([] as Negociacao[]).concat(this.negociacoes);
  }

  paraTexto(): void {
    console.log('Impressao');
    console.log(JSON.stringify(this.negociacoes));
  }

  ehIgual(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) == JSON.stringify(negociacoes.paraArray());
  }

}
