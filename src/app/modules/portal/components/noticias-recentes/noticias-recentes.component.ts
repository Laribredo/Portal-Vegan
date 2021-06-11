import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GET_APELIDO, GET_ID, REPO_IMAGENS } from 'src/app/shared/const/constantes';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { Noticias } from 'src/app/shared/models/Noticias';

@Component({
  selector: 'app-noticias-recentes',
  templateUrl: './noticias-recentes.component.html',
  styleUrls: ['./noticias-recentes.component.css']
})
export class NoticiasRecentesComponent implements OnInit {

  constructor(private service: publicacaoProvider,  private toastr: ToastrService, private route:Router) { }

  noticias:Array<any> = [];
  noticiasPaginas = [];
  repositorio:string = REPO_IMAGENS;
  paginaAtual:number = 0;

  ngOnInit(): void {
    this.GetPublicacoes();
  }


  //TODO: colocar filtro

  GetPublicacoes(){
    this.noticiasPaginas = [];
    this.service.getAllNoticias().subscribe(res =>{

      this.noticias = res;
      console.log(this.noticias);

      let numeroItens = 0;
      let notica_pag = [];
      this.noticias.map((noticia, i) =>{
        numeroItens++;
        notica_pag.push(noticia);
        //NUMERO DE ITENS POR PAGINA
        if(numeroItens == 3)
        {
          numeroItens = 0;
          this.noticiasPaginas.push(notica_pag);
          notica_pag = [];
        }
      })

      if(notica_pag.length > 0) this.noticiasPaginas.push(notica_pag);

      //Diminuindo a página ao não ter mais itens na página atual
      if(this.noticiasPaginas[this.paginaAtual] === undefined)
      {
        this.paginaAtual--;
      }

      console.log(this.noticiasPaginas);

      console.log(res);
    },err =>{

    })
  }


  lerPublicacao(id:string)
  {
    this.route.navigate(['portal/ler-noticia'],{queryParams:{id:id}})
  }



}
