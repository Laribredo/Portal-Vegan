import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';
import { GET_APELIDO, GET_ID, REPO_IMAGENS } from 'src/app/shared/const/constantes';
import { Noticias } from 'src/app/shared/models/Noticias';

@Component({
  selector: 'app-meus-restaurantes',
  templateUrl: './meus-restaurantes.component.html',
  styleUrls: ['./meus-restaurantes.component.css'],
})
export class MeusRestaurantesComponent implements OnInit {
  constructor(
    private service: RestaurantesService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  noticias: Array<Noticias> = [];
  noticiasPaginas = [];
  repositorio: string = REPO_IMAGENS;
  apelido: string = GET_APELIDO;
  paginaAtual: number = 0;

  ngOnInit(): void {
    this.GetPublicacoes();
  }

  GetPublicacoes() {
    this.noticiasPaginas = [];
    this.service.getRestauranteByUser().subscribe(
      (res) => {
        this.noticias = res;
        console.log(this.noticias);
        let numeroItens = 0;
        let notica_pag = [];
        this.noticias.map((noticia, i) => {
          numeroItens++;
          notica_pag.push(noticia);
          //NUMERO DE ITENS POR PAGINA
          if (numeroItens == 3) {
            numeroItens = 0;
            this.noticiasPaginas.push(notica_pag);
            notica_pag = [];
          }
        });

        if (notica_pag.length > 0) this.noticiasPaginas.push(notica_pag);

        //Diminuindo a página ao não ter mais itens na página atual
        if (this.noticiasPaginas[this.paginaAtual] === undefined) {
          this.paginaAtual--;
        }

        console.log(this.noticiasPaginas);

        console.log(res);
      },
      (err) => {}
    );
  }

  editarPublicacao(id: string) {
    this.route.navigate(['portal/cadastro-restaurantes'], {
      queryParams: { id: id },
    });
  }

  deletePublicacao(id: string): void {
    this.service.deleteRestauranteById(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Publicação excluída com sucesso.');
          this.GetPublicacoes();
        } else {
          this.toastr.error('Ocorreu um erro ao excluir a publicação');
        }
      },
      (err) => {}
    );
  }
}
