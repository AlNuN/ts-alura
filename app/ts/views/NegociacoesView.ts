class NegociacoesView {
  private elemento: Element;

  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor);
  }

  update(modelo: Negociacoes) : void {
    this.elemento.innerHTML = this.template(modelo);
  }

  template(modelo: Negociacoes): string {

    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>

        <tbody>
          ${modelo.paraArray().map((negociacao) => 
            `
              <tr>
                <td>${negociacao.data.getDate()}/${negociacao.data.getMonth() + 1}/${negociacao.data.getFullYear()}</td>
                <td>${negociacao.quantidade}</td>
                <td>${negociacao.valor}</td>
                <td>${negociacao.volume}</td>
              </tr>
            `)
            .join('')}
        </tbody>

        <tfoot>
        </tfoot>
      </table>
    `;
  }
}