export class Restaurantes {
  public id:any;
  public idUsuario:any;
  public uf:string;
  public municipio:string;
  public endereco:string;
  public numero:string;
  public cep:string;
  public imagem:string;
  public nomeRestaurante:string;
  public dtCadastro:Date;

  constructor(init?: Partial<Restaurantes>){
    Object.assign(this, init);
  }
}
