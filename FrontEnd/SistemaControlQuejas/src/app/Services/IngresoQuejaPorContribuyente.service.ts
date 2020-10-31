import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IngresoQuejaPorContribuyenteService {
  baseUrl: string;
  constructor(private http: HttpClient) {
  this.baseUrl = environment.baseUrl;
  }

  public getAllTiposQuejas(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/quejass`);
  }

  public getPuntosAtencion(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorContribuyente/puntosAtencion`);
  }
  public getTiposQuejas(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorContribuyente/quejas`);
  }
  public MediosIngresoDeQueja(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorContribuyente/medios`);
  }
  public correlativo(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorContribuyente/correlativo`);
  }
  public InsertQuejas(enviarQueja): Observable<any>{
    return this.http.post(`${this.baseUrl}IngresoQuejaPorContribuyente`, enviarQueja);
   }
}
