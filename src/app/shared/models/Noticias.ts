export class Noticias{
  public id:any;
  public titulo:string;
  public imagem:string;
  public conteudo:string;
  public usuario:any;
  public dtCadastro:string;

  constructor(init?: Partial<Noticias>){
    Object.assign(this, init);
  }
}
