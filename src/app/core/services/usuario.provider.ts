import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, retry, take, map } from 'rxjs/operators';
import { API_LOCAL } from '../../shared/const/constantes';
import { Usuario } from '../../shared/models/Usuario';

@Injectable()
export class usuarioProvider {
  constructor(private http: HttpClient) {}

  Cadastrar(obj: Usuario): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Cadastro', obj).pipe(
      retry(3),
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  Login(obj): Observable<any> {
    console.log(obj);
    return this.http.post<any>(API_LOCAL + '/Cadastro/login', obj).pipe(
      retry(3),
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  isLogged(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http
      .get<any>(API_LOCAL + '/Cadastro/isLogged', {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
