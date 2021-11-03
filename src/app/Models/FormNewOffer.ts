export class FormNewOffer {

  private titulo: string
  private descripcion: string
  private empresa: string
  private salario: number
  private ciudad: string
  private email: string

  constructor(
    titulo: string,
    descripcion: string,
    empresa: string,
    salario: number,
    ciudad: string,
    email: string
) {
    this.titulo = titulo
    this.descripcion = descripcion
    this.empresa = empresa
    this.salario = salario
    this.ciudad = ciudad
    this.email = email
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public getEmpresa(): string {
    return this.empresa;
  }

  public getSalario(): number {
    return this.salario;
  }

  public getCiudad(): string {
    return this.ciudad;
  }

  public getEmail(): string {
    return this.email;
  }


}
