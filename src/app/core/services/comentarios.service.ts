import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentariosNoticia } from 'src/app/shared/models/ComentariosNoticia';
import { Observable, throwError, observable } from 'rxjs';
import { API_LOCAL } from 'src/app/shared/const/constantes';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosProvider {

  constructor(private http: HttpClient) { }

  postarComentario(comentario:ComentariosNoticia): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Comentario/Noticias', comentario, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getComentarios(idPublicacao): Observable<any> {
    return this.http.get<any>(API_LOCAL + '/Comentario/Noticias/'+idPublicacao, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getComentariosReceitas(idPublicacao): Observable<any> {
    return this.http.get<any>(API_LOCAL + '/Comentario/Receitas/'+idPublicacao, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  postarComentarioReceita(comentario:ComentariosNoticia): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Comentario/Receitas', comentario, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
