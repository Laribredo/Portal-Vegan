import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, retry, take, map, tap } from 'rxjs/operators';
import { API_LOCAL } from '../../shared/const/constantes';
import { Usuario } from '../../shared/models/Usuario';
import { Noticias } from '../../shared/models/Noticias';

@Injectable()
export class publicacaoProvider{

  constructor(private http: HttpClient) {}

  uploadImagens(file: any): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Repository', file, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getNoticiasRecentes(usuario){
    return this.http.get<any>(API_LOCAL + '/Publicacao/Recentes/'+usuario, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getNoticiasByUser(usuario){
    return this.http.get<any>(API_LOCAL + '/Publicacao/Cadastro/'+usuario, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getAllNoticias(){
    return this.http.get<any>(API_LOCAL + '/Publicacao/', {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getNoticiasById(id){
    return this.http.get<any>(API_LOCAL + '/Publicacao/'+id, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  deleteNoticiaById(id){
    return this.http.delete<any>(API_LOCAL + '/Publicacao/'+id, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }


  cadastrarNoticia(noticia:Noticias): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Publicacao', noticia, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  alterarNoticia(noticia:Noticias): Observable<any> {
    return this.http.put<any>(API_LOCAL + '/Publicacao', noticia, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }


}
