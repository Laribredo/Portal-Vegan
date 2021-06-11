import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { PortalComponent } from './modules/portal/portal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   component: LoginLayoutComponent,
  //   loadChildren: () => import('src/app/layouts/login-layout/login-layout.module').then(m => m.LoginLayoutModule)
  // },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('src/app/modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'portal',
    component: PortalComponent,
    loadChildren: () =>
      import('src/app/modules/portal/portal.module').then(
        (m) => m.PortalModule
      ),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'seguro',
  //   component: SeguroComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: './layouts/seguro/seguro.module#SeguroLayoutModule',
  //     canActivate:[AuthGuard]
  //   }]
  // },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
