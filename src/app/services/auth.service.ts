import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(
      `${environment.apiUrl}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(
      `${environment.apiUrl}/register`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.get(`${environment.apiUrl}/logout`, {
      withCredentials: true,
    });
  }

  refreshToken() {
    return this.http.get(`${environment.apiUrl}/refresh`, {
      withCredentials: true,
    });
  }
}
