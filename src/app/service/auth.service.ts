import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { path } from '../../environments/path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;

  constructor(private http: HttpClient) { }

  authUser(usuario: UsuarioModel, path) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    let url = environment.url + path;
    console.log(url);
    let headers = this.getHeaders();
    return this.http.post(url, authData, { headers });
  }

  private getHeaders(){
    let headers = new HttpHeaders();
    return headers.append("Content-Type", "application/json");
  }

  logout() {
    sessionStorage.removeItem('token');
  }


}
