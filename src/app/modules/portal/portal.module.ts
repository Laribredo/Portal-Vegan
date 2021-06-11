import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PortalRoutes } from './portal.routing';
import { CadastroNoticiasComponent } from './components/cadastro-noticias/cadastro-noticias.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecentesComponent } from './components/cadastro-noticias/recentes/recentes.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { MinhasNoticiasComponent } from './components/minhas-noticias/minhas-noticias.component';
import { LerNoticiaComponent } from './components/ler-noticia/ler-noticia.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoticiasRecentesComponent } from './components/noticias-recentes/noticias-recentes.component';
import { ComentariosNoticiaComponent } from './components/comentarios-noticia/comentarios-noticia.component';
import { ComentariosProvider } from 'src/app/core/services/comentarios.service';
import { CadastroReceitasComponent } from './components/cadastro-receitas/cadastro-receitas.component';
import { ReceitasService } from 'src/app/core/services/receitas.service';
import { ReceitasRecentesComponent } from './components/receitas-recentes/receitas-recentes.component';
import { MinhasReceitasComponent } from './components/minhas-receitas/minhas-receitas.component';
import { LerReceitaComponent } from './components/ler-receita/ler-receita.component';
import { ComentariosReceitasComponent } from './components/comentarios-receitas/comentarios-receitas.component';
import { RestaurantesRecentesComponent } from './components/restaurantes-recentes/restaurantes-recentes.component';
import {AgmCoreModule  } from '@agm/core';
import { CadastroRestaurantesComponent } from './components/cadastro-restaurantes/cadastro-restaurantes.component';
import { MeusRestaurantesComponent } from './components/meus-restaurantes/meus-restaurantes.component';

@NgModule({
  declarations: [
    PortalComponent,
    CadastroNoticiasComponent,
    RecentesComponent,
    NavbarComponent,
    NoticiasComponent,
    MinhasNoticiasComponent,
    LerNoticiaComponent,
    SidebarComponent,
    NoticiasRecentesComponent,
    ComentariosNoticiaComponent,
    CadastroReceitasComponent,
    ReceitasRecentesComponent,
    MinhasReceitasComponent,
    LerReceitaComponent,
    ComentariosReceitasComponent,
    RestaurantesRecentesComponent,
    CadastroRestaurantesComponent,
    MeusRestaurantesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    // BrMaskerModule,
    ReactiveFormsModule,
    RouterModule,
    AngularEditorModule,
    RouterModule.forChild(PortalRoutes),
    AgmCoreModule.forRoot({
      apiKey:""
    })
  ],
  providers: [publicacaoProvider, ComentariosProvider, ReceitasService],
})
export class PortalModule {}
