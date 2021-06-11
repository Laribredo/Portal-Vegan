import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routing';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DefaultComponent } from './components/default/default.component';
import { LoginAreaComponent } from './components/login/login.component';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    DefaultComponent,
    LoginComponent,
    LoginAreaComponent,
    NavbarLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // BrMaskerModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(LoginRoutes),
  ],
})
export class LoginModule {}
