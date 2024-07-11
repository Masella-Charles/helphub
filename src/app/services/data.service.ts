import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base_url = environment.base_url;


  constructor(private http: HttpClient,private router: Router) { }

  postAuth(endpoint: any, payload: any): Observable<any> {
    return this.http.post(this.base_url + endpoint, payload);
  }
  getCallwHeaders(endpoint: any) {
    return this.http.get(this.base_url + endpoint);
  }
  getWithoutPayload(endpoint: any) {
    let headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'
    });

    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get(this.base_url + endpoint, { headers });
  }

  postWithoutPayload(endpoint: any) {
    let headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'
    });

    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.post(this.base_url + endpoint, { headers });
  }
  


  postWithPayload(endpoint: string, payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'
    });

    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return this.http.post(this.base_url + endpoint, payload, { headers });
  }

  isValid(response: any): boolean {
    return response.responseStatus !== 'The JWT token has expired';
  }


  logout() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
      
    }
    this.router.navigate(['']);
  }
}
