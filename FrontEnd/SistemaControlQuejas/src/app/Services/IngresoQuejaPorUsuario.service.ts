import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IngresoQuejaPorUsuarioService {
  baseUrl: string;
  constructor(private http: HttpClient) {
  this.baseUrl = environment.baseUrl;
  }


  public getPuntosAtencion(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorUsuario/puntosAtencion`);
  }
  public getTiposQuejas(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorUsuario/quejas`);
  }
  public MediosIngresoDeQueja(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/IngresoQuejaPorUsuario/medios`);
  }

  public InsertQuejas(enviarQueja): Observable<any>{
    return this.http.post(`${this.baseUrl}/IngresoQuejaPorUsuario`, enviarQueja);
   }
}
