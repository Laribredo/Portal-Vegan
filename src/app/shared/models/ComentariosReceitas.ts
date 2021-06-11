export class ComentariosReceitas{
  public id:any;
  public idPublicacao:any;
  public idUsuario:any;
  public descricao:string;
  public dtComentario:Date;

  constructor(init?: Partial<ComentariosReceitas>){
    Object.assign(this, init);
  }
}
