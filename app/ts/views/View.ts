import { logarTempoDeExecução } from '../helpers/decorators/index';

export abstract class View<T> {
  private elemento: JQuery;
  private escapar: boolean;

  constructor(seletor: string, escapar: boolean = false) {
    this.elemento = $(seletor);
    this.escapar = escapar;
  }

  @logarTempoDeExecução()
  update(model: T): void {
    let template = this.template(model);
    if (this.escapar)
      template = template.replace(/<script>[\s\S]*?<\/script>/g,'');
    this.elemento.html(template);
  }

  abstract template(model: T) : string;

}
