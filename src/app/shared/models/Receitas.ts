import {CategoriaReceita} from 'src/app/shared/enum/categoria-receita.enum';

export class Receitas {
  public id:any;
  public idUsuario:any;
  public titulo:string;
  public conteudo:string;
  public imagem:string;
  public receita:CategoriaReceita;
  public dtCriacao:Date;

  constructor(init?: Partial<Receitas>){
    Object.assign(this, init);
  }
}
