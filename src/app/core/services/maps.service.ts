import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentariosNoticia } from 'src/app/shared/models/ComentariosNoticia';
import { Observable, throwError, observable } from 'rxjs';
import { API_LOCAL } from 'src/app/shared/const/constantes';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(private http: HttpClient) { }

  buscarDistancia(enderecoOrigin,enderecoDestino): Observable<any> {
    return this.http.post<any>("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+enderecoOrigin+"&destinations="+enderecoDestino,null).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

}
