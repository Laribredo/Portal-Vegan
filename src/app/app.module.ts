import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.component';
import { NavbarLoginComponent } from './modules/login/components/navbar-login/navbar-login.component';
import { DefaultComponent } from './modules/login/components/default/default.component';
import { CadastroComponent } from './modules/login/components/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { usuarioProvider } from './core/services/usuario.provider';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { NavbarComponent } from './modules/portal/components/navbar/navbar.component';
import { NoticiasComponent } from './modules/portal/components/noticias/noticias.component';
import { CadastroNoticiasComponent } from './modules/portal/components/cadastro-noticias/cadastro-noticias.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecentesComponent } from './modules/portal/components/cadastro-noticias/recentes/recentes.component';
import { LoginModule } from './modules/login/login.module';
import { PortalModule } from './modules/portal/portal.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    LoginModule,
    PortalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [usuarioProvider,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
