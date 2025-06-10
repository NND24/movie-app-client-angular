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

  updateAvatar(avatar: string) {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put(
        `${environment.apiUrl}/update-user-avatar`,
        {
          avatar,
        },
        { headers }
      );
    }

    return this.http.put(`${environment.apiUrl}/update-user-avatar`, {
      avatar,
    });
  }

  editProfile(name: string) {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put(
        `${environment.apiUrl}/update-user-info`,
        {
          name,
        },
        { headers }
      );
    }

    return this.http.put(`${environment.apiUrl}/update-user-info`, {
      name,
    });
  }

  updatePassword(oldPassword: string, newPassword: string) {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put(
        `${environment.apiUrl}/update-user-password`,
        {
          oldPassword,
          newPassword,
        },
        { headers }
      );
    }

    return this.http.put(`${environment.apiUrl}/update-user-password`, {
      oldPassword,
      newPassword,
    });
  }

  addMovieToFavorite(slug: string) {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put(
        `${environment.apiUrl}/addFollowedMovie`,
        {
          slug,
        },
        { headers }
      );
    }

    return this.http.put(`${environment.apiUrl}/addFollowedMovie`, {
      slug,
    });
  }

  removeMovieFromFavorite(slug: string) {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put(
        `${environment.apiUrl}/removeFollowedMovie`,
        {
          slug,
        },
        { headers }
      );
    }

    return this.http.put(`${environment.apiUrl}/removeFollowedMovie`, {
      slug,
    });
  }

  addToHistory(movie_slug: string, ep: string) {
    const tokenData = localStorage.getItem('user');

    if (tokenData) {
      const user = JSON.parse(tokenData);
      const token = user.accessToken;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.put(
        `${environment.apiUrl}/addToHistory`,
        {
          movie_slug,
          ep,
        },
        { headers }
      );
    }

    return this.http.put(`${environment.apiUrl}/addToHistory`, {
      movie_slug,
      ep,
    });
  }
}
