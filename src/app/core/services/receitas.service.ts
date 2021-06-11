import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, retry, take, map } from 'rxjs/operators';
import { API_LOCAL } from '../../shared/const/constantes';
import { Usuario } from '../../shared/models/Usuario';
import { Receitas } from 'src/app/shared/models/Receitas';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

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

  cadastrarReceita(receita:Receitas): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Receita', receita, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  alterarReceita(receita:Receitas): Observable<any> {
    return this.http.put<any>(API_LOCAL + '/Receita', receita, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getAllReceitas(){
    return this.http.get<any>(API_LOCAL + '/Receita', {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getReceitaById(idReceita){
    return this.http.get<any>(API_LOCAL + '/Receita/Editar/'+idReceita, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getLerReceitaById(idReceita){
    return this.http.get<any>(API_LOCAL + '/Receita/Ler/'+idReceita, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }


  deletReceitaById(id){
    return this.http.delete<any>(API_LOCAL + '/Receita/'+id, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getMinhasReceitas(idUsuario){
    return this.http.get<any>(API_LOCAL + '/Receita/'+idUsuario
    , {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

}
