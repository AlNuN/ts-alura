export abstract class View<T> {
  private elemento: JQuery;

  constructor(seletor: string) {
    this.elemento = $(seletor);
  }

  update(model: T): void {
    this.elemento.html(this.template(model));
  }

  abstract template(model: T) : string;

}
