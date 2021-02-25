import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';

export class NegociacaoController {
  private inputData: JQuery;
  private inputQuantidade: JQuery;
  private inputValor: JQuery;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = $('#data');
    this.inputQuantidade = $('#quantidade');
    this.inputValor = $('#valor');
    this.negociacoesView.update(this.negociacoes);
  }

  adiciona(event: Event) {
    event.preventDefault();

    let data = new Date(this.inputData.val().replace(/-/g, ','));

    if (!this.ehDiaUtil(data)) {
      this.mensagemView.update('Somente negociações em dias úteis, por favor!')
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this.inputQuantidade.val()),
      parseFloat(this.inputValor.val())
    );

    this.negociacoes.adiciona(negociacao);

    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso!');
  }

  private ehDiaUtil(data: Date) : boolean {
    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}
