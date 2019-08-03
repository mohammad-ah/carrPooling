import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient ) {
  }

  registerUser(userDate): Observable <any> {

    return this.http.post('http://127.0.0.1:8000/api/users/', userDate);

  }

  loginUser(userDate): Observable <any> {
    console.log(userDate)
    return this.http.post('http://127.0.0.1:8000/auth/', userDate);

  }

  isLogged() {
    return localStorage.getItem('Token') != null;
  }
}
