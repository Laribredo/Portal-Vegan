import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { ReceitasService } from 'src/app/core/services/receitas.service';
import { REPO_IMAGENS } from 'src/app/shared/const/constantes';

@Component({
  selector: 'app-ler-receita',
  templateUrl: './ler-receita.component.html',
  styleUrls: ['./ler-receita.component.css']
})
export class LerReceitaComponent implements OnInit {

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

  constructor(private activatedRoute: ActivatedRoute, private service: ReceitasService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id !== undefined) {
        this.idPubli = params.id;
        this.service.getLerReceitaById(this.idPubli).subscribe(res =>{
          this.noticia = res;
          console.log(this.noticia);
        })
      }
    })
  }

}
