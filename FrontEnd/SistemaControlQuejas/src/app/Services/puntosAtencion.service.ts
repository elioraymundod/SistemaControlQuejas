import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PuntosAtencnionService {
  baseUrl: string;
  constructor(private http:HttpClient) { 
  this.baseUrl=environment.baseUrl;
  }

  public getPuntosAtencion():Observable<any>{

    return this.http.get<any>(`${this.baseUrl}/puntosAtencion`);

  }

  public UpdatePuntoAtencion(puntoAtencion):Observable<any>{
    return this.http.put(`${this.baseUrl}/puntosAtencion`,puntoAtencion)
   }

   public InsertPuntoAtencion(puntoAtencion):Observable<any>{
    return this.http.post(`${this.baseUrl}/puntosAtencion`,puntoAtencion)
   }
   
   public getPuntosAtencionByCodigo(codigoRegion):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/puntosAtencion/codigoRegion/${codigoRegion}`);
  }

  public getPuntosAtencionByNombre(nombre, codigo):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/puntosAtencion/nombre/${nombre}/${codigo}`);
  }

  public getPuntosAtencionExternosInternosByCodigoPunto(codigoPunto):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/puntosAtencion/externos/internos/${codigoPunto}`);
  }

  public inactivarUsuarios(usuario):Observable<any>{
    return this.http.put(`${this.baseUrl}/inactivarUsuarios`,usuario)
   }
}