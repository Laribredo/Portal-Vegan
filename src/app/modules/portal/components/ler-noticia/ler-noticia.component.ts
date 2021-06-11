import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { REPO_IMAGENS } from 'src/app/shared/const/constantes';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { Noticias } from 'src/app/shared/models/Noticias';

@Component({
  selector: 'app-ler-noticia',
  templateUrl: './ler-noticia.component.html',
  styleUrls: ['./ler-noticia.component.css']
})
export class LerNoticiaComponent implements OnInit {

  noticia:{
    id:any,
    apelido:string,
    qtdComentarios:number,
    dtCriacao:Date,
    titulo:string,
    conteudo:string,
    imagem:string
  } = null;
  repositorio:string = REPO_IMAGENS;
  idPubli:string = "";

  constructor(private activatedRoute: ActivatedRoute, private service: publicacaoProvider) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id !== undefined) {
        this.idPubli = params.id;
        this.service.getNoticiasById(this.idPubli).subscribe(res =>{
          this.noticia = res;
          console.log(this.noticia);
        })
      }
    })
  }

}
