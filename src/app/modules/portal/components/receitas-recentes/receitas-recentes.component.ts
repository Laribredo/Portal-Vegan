import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { ReceitasService } from 'src/app/core/services/receitas.service';
import { REPO_IMAGENS } from 'src/app/shared/const/constantes';
import { CategoriaReceita } from 'src/app/shared/enum/categoria-receita.enum';
import { Receitas } from 'src/app/shared/models/Receitas';

@Component({
  selector: 'app-receitas-recentes',
  templateUrl: './receitas-recentes.component.html',
  styleUrls: ['./receitas-recentes.component.css']
})
export class ReceitasRecentesComponent implements OnInit {

  constructor(private service: ReceitasService,  private toastr: ToastrService, private route:Router) { }

  noticias:Array<any> = [];
  noticiasPaginas = [];
  repositorio:string = REPO_IMAGENS;
  paginaAtual:number = 0;
  enum:CategoriaReceita;
  qtdDoce:number = 0;
  qtdSalgado:number = 0;

  ngOnInit(): void {
    this.GetPublicacoes();
  }



  paginacao(categorias:number)
  {
    let numeroItens = 0;
    let notica_pag = [];
    this.noticiasPaginas = [];

    this.noticias.map((noticia, i) =>{
      if(noticia.receita == CategoriaReceita.DOCE && categorias == CategoriaReceita.DOCE)
      {
        numeroItens++;
        notica_pag.push(noticia);
      }

      if(noticia.receita == CategoriaReceita.SALGADO && categorias == CategoriaReceita.SALGADO)
      {
        numeroItens++;
        notica_pag.push(noticia);
      }
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
    this.paginaAtual = 0;
  }


  //TODO: colocar filtro
  GetPublicacoes(){
    this.noticiasPaginas = [];
    this.service.getAllReceitas().subscribe(res =>{

      this.noticias = res;
      console.log(this.noticias);

      let numeroItens = 0;
      let notica_pag = [];
      this.noticias.map((noticia, i) =>{
        numeroItens++;
        notica_pag.push(noticia);
        if(noticia.receita == CategoriaReceita.DOCE)
        {
          this.qtdDoce+=1;
        }else{
          this.qtdSalgado+=1
        }
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
    this.route.navigate(['portal/ler-receita'],{queryParams:{id:id}})
  }


}
