import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private _user = signal<any>(this.getUserFromStorage());
  readonly user = this._user.asReadonly();

  setUser(user: any) {
    this._user.set(user.user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this._user.set(null);
    localStorage.removeItem('user');
  }

  private getUserFromStorage(): any {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null').user;
    } catch (error) {
      return null;
    }
  }

  updateAvatar(avatar: string) {
    return this.http.put(`${environment.apiUrl}/update-user-avatar`, {
      avatar,
    });
  }

  editProfile(name: string) {
    return this.http.put(`${environment.apiUrl}/update-user-info`, { name });
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return this.http.put(`${environment.apiUrl}/update-user-password`, {
      oldPassword,
      newPassword,
    });
  }

  addMovieToFavorite(slug: string) {
    return this.http.put(`${environment.apiUrl}/addFollowedMovie`, { slug });
  }

  removeMovieFromFavorite(slug: string) {
    return this.http.put(`${environment.apiUrl}/removeFollowedMovie`, { slug });
  }

  addToHistory(movie_slug: string, ep: string) {
    return this.http.put(`${environment.apiUrl}/addToHistory`, {
      movie_slug,
      ep,
    });
  }
}
