import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject } from '../helpers/decorators/index';

export class NegociacaoController {
  @domInject('#data')
  private inputData: JQuery;

  @domInject('#quantidade')
  private inputQuantidade: JQuery;

  @domInject('#valor')
  private inputValor: JQuery;

  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
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
