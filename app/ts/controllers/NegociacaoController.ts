import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, thottle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index';

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
  private negociacaoService = new NegociacaoService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @thottle()
  adiciona() {

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

    imprime(negociacao, this.negociacoes);

    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso!');
  }

  private ehDiaUtil(data: Date) : boolean {
    return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
  }

  @thottle()
  importaDados() {
    const isOK: HandlerFunction = (res: Response) => {
      if(res.ok) {
        return res;
      } else { 
        throw new Error(res.statusText);
      }
    }

    this.negociacaoService
      .obterNegociacoes(isOK)
      .then((negociacoesParaImportar) => {
        const negociacoesJaImportadas = this.negociacoes.paraArray();

        negociacoesParaImportar
          .filter((negociacao) => 
            !negociacoesJaImportadas.some((jaImportada) =>
              negociacao.ehIgual(jaImportada)))
          .forEach((negociacao) => this.negociacoes.adiciona(negociacao))

        this.negociacoesView.update(this.negociacoes);
      }) 
      .catch((e) => console.log(e.message));

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
