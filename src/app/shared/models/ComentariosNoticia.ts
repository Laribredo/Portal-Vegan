export class ComentariosNoticia{
  public id:any;
  public idPublicacao:any;
  public idUsuario:any;
  public descricao:string;
  public dtComentario:Date;

  constructor(init?: Partial<ComentariosNoticia>){
    Object.assign(this, init);
  }
}
