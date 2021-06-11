export class Usuario{

    public id:any;
    public nome:string;
    public cpf:string;
    public email:string;
    public senha:string;
    public apelido:string;
    public dataNascimento:string;

  constructor(init?: Partial<Usuario>){
    Object.assign(this, init);
  }
}
