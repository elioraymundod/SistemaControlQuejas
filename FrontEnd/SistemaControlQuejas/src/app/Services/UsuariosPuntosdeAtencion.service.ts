import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosPuntosdeAtencionService {
  baseUrl: string;
  constructor(private http:HttpClient) { 
  this.baseUrl=environment.baseUrl;
  }

  public getUsuariosPuntosdeAtencion():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/UsuariosPuntosdeAtencion`);
  }

  public UpdatePuntoAtencion(UsuariosPuntosdeAtencion):Observable<any>{
    return this.http.put(`${this.baseUrl}/UsuariosPuntosdeAtencion`,UsuariosPuntosdeAtencion)
   }
  
  public getPuntosAtencionByCodigo(codigoRegion):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/puntosAtencion/codigoRegion/${codigoRegion}`);
  }

  public getUsuarioByDpi(dpiUsuario):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/usuario/dpi/${dpiUsuario}`);
  }

}