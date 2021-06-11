import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MESES } from 'src/app/shared/const/constantes';
import { Noticias } from 'src/app/shared/models/Noticias';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';

@Component({
  selector: 'app-recentes',
  templateUrl: './recentes.component.html',
  styleUrls: ['./recentes.component.css']
})
export class RecentesComponent implements OnChanges {

  @Input() atualiza:boolean;

  constructor(private service: publicacaoProvider) { }
  ngOnChanges(changes: SimpleChanges): void {

    this.buscaProcessosRecentes()
  }

  buscaProcessosRecentes(){
    this.service.getNoticiasRecentes(localStorage.getItem("id")).subscribe((res:Array<Noticias>) =>{
      res.map((n,i)=>{
        let data = new Date(n.dtCadastro);
        n.dtCadastro =  (data.getDate() + " " + MESES[(data.getMonth())] + " " + data.getFullYear())
      })
      this.recentes = res;
    })
  }

  recentes:Array<Noticias> = [];
}
