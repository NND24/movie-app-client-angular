import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }

  getUser() {
    return this.userSubject.getValue();
  }

  private getAuthHeaders(): { headers?: HttpHeaders } {
    const tokenData = localStorage.getItem('user');
    if (tokenData) {
      try {
        const token = JSON.parse(tokenData)?.accessToken;
        if (token) {
          return {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
          };
        }
      } catch (_) {
        console.warn('Invalid token data in localStorage');
      }
    }
    return {};
  }

  updateAvatar(avatar: string) {
    return this.http.put(
      `${environment.apiUrl}/update-user-avatar`,
      { avatar },
      this.getAuthHeaders()
    );
  }

  editProfile(name: string) {
    return this.http.put(
      `${environment.apiUrl}/update-user-info`,
      { name },
      this.getAuthHeaders()
    );
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return this.http.put(
      `${environment.apiUrl}/update-user-password`,
      { oldPassword, newPassword },
      this.getAuthHeaders()
    );
  }

  addMovieToFavorite(slug: string) {
    return this.http.put(
      `${environment.apiUrl}/addFollowedMovie`,
      { slug },
      this.getAuthHeaders()
    );
  }

  removeMovieFromFavorite(slug: string) {
    return this.http.put(
      `${environment.apiUrl}/removeFollowedMovie`,
      { slug },
      this.getAuthHeaders()
    );
  }

  addToHistory(movie_slug: string, ep: string) {
    return this.http.put(
      `${environment.apiUrl}/addToHistory`,
      { movie_slug, ep },
      this.getAuthHeaders()
    );
  }
}
