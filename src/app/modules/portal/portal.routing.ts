import { Routes } from "@angular/router";
import { CadastroNoticiasComponent } from "./components/cadastro-noticias/cadastro-noticias.component";
import { CadastroReceitasComponent } from "./components/cadastro-receitas/cadastro-receitas.component";
import { CadastroRestaurantesComponent } from "./components/cadastro-restaurantes/cadastro-restaurantes.component";
import { LerNoticiaComponent } from "./components/ler-noticia/ler-noticia.component";
import { LerReceitaComponent } from "./components/ler-receita/ler-receita.component";
import { MeusRestaurantesComponent } from "./components/meus-restaurantes/meus-restaurantes.component";
import { MinhasNoticiasComponent } from "./components/minhas-noticias/minhas-noticias.component";
import { MinhasReceitasComponent } from "./components/minhas-receitas/minhas-receitas.component";
import { NoticiasRecentesComponent } from "./components/noticias-recentes/noticias-recentes.component";
import { NoticiasComponent } from "./components/noticias/noticias.component";
import { ReceitasRecentesComponent } from "./components/receitas-recentes/receitas-recentes.component";
import { RestaurantesRecentesComponent } from "./components/restaurantes-recentes/restaurantes-recentes.component";

export const PortalRoutes: Routes = [
  { path:"noticias", component: NoticiasComponent},
  { path:"cadastro-noticias", component: CadastroNoticiasComponent},
  { path:"minhas-noticias", component: MinhasNoticiasComponent},
  { path:"ler-noticia", component: LerNoticiaComponent},
  { path:"ler-receita", component: LerReceitaComponent},
  { path:"noticias-recentes", component: NoticiasRecentesComponent},
  { path:"cadastro-receitas", component: CadastroReceitasComponent},
  { path:"receitas-recentes", component: ReceitasRecentesComponent},
  { path:"minhas-receitas", component: MinhasReceitasComponent},
  { path:"cadastro-restaurantes", component: CadastroRestaurantesComponent},
  { path:"restaurantes-recentes", component: RestaurantesRecentesComponent},
  { path:"meus-restaurantes", component: MeusRestaurantesComponent},
]
