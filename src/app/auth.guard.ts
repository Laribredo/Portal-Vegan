import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { usuarioProvider } from './core/services/usuario.provider';

//import { AdministradorProvider } from './services/administrador.provider';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private route: Router, private service:usuarioProvider){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.service.isLogged().pipe(map(e =>{
          return true;
      }),catchError((err) => {
          this.route.navigate(['/login']);
          throw (err)
        }));
    }
}
