import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from '../Models/jwt-response';
import { User } from '../Models/user';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable()
export class AuthService {
  baseUrl: string;
  AUTH_SERVER: string = 'http://localhost:3308'; 
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl=environment.baseUrl;
   }

  /*login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,
    user).pipe(tap(
      (res: JwtResponse) => {
        if (res) {
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }
      })
    );
  } 
  */
 public login(usuario, password):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/login/${usuario}/${password}`);
 }
 
  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken (token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
}
