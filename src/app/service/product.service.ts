import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductById(id, path) {
    const authData = {
      id: id
    };
    let url = environment.url + path;
    let headers = this.getHeaders();
    return this.http.post(url, authData, { headers });
  }

  getListProducts(path) {
    let url = environment.url + path;
    let headers = this.getHeaders();
    return this.http.post(url, null, { headers });
  }

  private getHeaders(){
    let token = sessionStorage.getItem('token');
    let headers = {
      'Content-Type': 'application/json',
      'token': token
    }
    return headers;
  }

}
