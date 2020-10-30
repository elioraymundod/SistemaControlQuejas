import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposQuejasService {

  baseUrl: string;
  constructor(private http: HttpClient) {
  this.baseUrl = environment.baseUrl;
  }

  public getTiposQuejas(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/tiposQuejas`);
  }

  public insertTipoQueja(tipoQueja): Observable<any> {
    return this.http.post(`${this.baseUrl}/tiposQuejas`, tipoQueja);
  }

  public getTiposQuejasBySiglas(siglas): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/tiposQuejas/siglas/${siglas}`);
  }

  public getQuejasByTipoQueja(tipoQueja): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tiposQuejas/siglas/${tipoQueja}`);
  }

  public updateTipoQueja(tipoQueja): Observable<any>{
    return this.http.put(`${this.baseUrl}/tiposQuejas`, tipoQueja);
  }
}
