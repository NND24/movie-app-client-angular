import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/login`, {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/register`, {
      name,
      email,
      password,
    });
  }

  logout() {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get(`${environment.apiUrl}/logout`, { headers });
    }

    return this.http.get(`${environment.apiUrl}/logout`);
  }
}
