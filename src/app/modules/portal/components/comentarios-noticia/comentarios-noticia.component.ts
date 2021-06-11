import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ComentariosProvider } from 'src/app/core/services/comentarios.service';
import { GET_ID } from 'src/app/shared/const/constantes';
import { ComentariosNoticia } from 'src/app/shared/models/ComentariosNoticia';

@Component({
  selector: 'app-comentarios-noticia',
  templateUrl: './comentarios-noticia.component.html',
  styleUrls: ['./comentarios-noticia.component.css']
})
export class ComentariosNoticiaComponent implements OnChanges {

  constructor(private service: ComentariosProvider, private tostr: ToastrService) { }

  @Input() idPublicacao:string = "";
  erros = null;
  aguarda:boolean = false;
  cadastro:FormGroup = new FormGroup({})
  comentarios:Array<{
    descricao:string,
    dtComentario:Date
    apelido:string
  }> = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.limpaForm();
    console.log(changes.idPublicacao.currentValue);
    this.getComentarios(changes.idPublicacao.currentValue);

  }

  getComentarios(idPublicacao){
    this.service.getComentarios(idPublicacao).subscribe(res =>{
      this.comentarios = res;
      console.log(res);

      console.log(this.comentarios);

    })
  }

  limpaForm(){
    this.cadastro = new FormGroup({
      id: new FormControl(null),
      idPublicacao:new FormControl(this.idPublicacao),
      idUsuario: new FormControl(GET_ID),
      descricao: new FormControl(null, Validators.required),
      dtComentario:new FormControl(new Date())
    })
  }

  onSubmit(){
    if(this.cadastro.valid)
    {
      this.aguarda = true;
        this.service.postarComentario(new ComentariosNoticia(this.cadastro.value)).subscribe(res =>{
          if(res.postado){
            this.tostr.success("Seu Comentário já está disponível","Oba! Comentário postado.")
            this.limpaForm();
            this.getComentarios(this.cadastro.value.idPublicacao);
          }else{
            this.tostr.error("Ocorreu um erro ao postar o comentário","Erro!")
          }
          this.aguarda = false;
        },err =>{
          if(err.status == "400")
          {
            this.erros = err.error.errors
          }
          this.aguarda = false;
        })
    }
    // alert("aqui")
  }

}
