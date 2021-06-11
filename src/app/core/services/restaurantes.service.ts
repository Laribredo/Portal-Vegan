import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentariosNoticia } from 'src/app/shared/models/ComentariosNoticia';
import { Observable, throwError, observable } from 'rxjs';
import { API_LOCAL } from 'src/app/shared/const/constantes';
import { catchError, map } from 'rxjs/operators';
import { Restaurantes } from 'src/app/shared/models/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private http: HttpClient) { }

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


  getEstados(){
    return this.http.get<any>(API_LOCAL + '/Restaurantes/Estados/', {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  cadastrarRestaurante(restaurante:Restaurantes): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Restaurantes', restaurante, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  alterarRestaurante(restaurante:Restaurantes): Observable<any> {
    return this.http.put<any>(API_LOCAL + '/Restaurantes', restaurante, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  avaliarRestaurante(avalicao:any): Observable<any> {
    return this.http.post<any>(API_LOCAL + '/Restaurantes/Avaliar', avalicao, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getCidades(cidade:string){
    return this.http.get<any>(API_LOCAL + '/Restaurantes/Municipios?estado='+cidade, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getRestaurante(cidade:string): Observable<any> {
    return this.http.get<any>(API_LOCAL + '/Restaurantes/'+cidade+"/"+localStorage.getItem("id"), {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getRestauranteByUser(): Observable<any> {
    return this.http.get<any>(API_LOCAL + '/Restaurantes/Meus/'+ localStorage.getItem("id"), {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getRestauranteById(id): Observable<any> {
    return this.http.get<any>(API_LOCAL + '/Restaurantes/'+ id, {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getRestaurantesByUsuario(id): Observable<any> {
    return this.http.get<any>(API_LOCAL + '/Restaurantes/Meus/'+ localStorage.getItem("id"), {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }


  deleteRestauranteById(id:string): Observable<any> {
    return this.http.delete<any>(API_LOCAL + '/Restaurantes/'+ id , {headers: new HttpHeaders().set( 'Authorization', 'Bearer ' + localStorage.getItem("token") )}).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
