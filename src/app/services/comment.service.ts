import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

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

  getComment(slug: string) {
    return this.http.get(
      `${environment.apiUrl}/get-comment/${slug}`,
      this.getAuthHeaders()
    );
  }

  addNewComment(slug: string, comment: string) {
    return this.http.put(
      `${environment.apiUrl}/add-comment`,
      {
        slug,
        comment,
      },
      this.getAuthHeaders()
    );
  }

  addNewAnswer(slug: string, answer: string, commentId: string) {
    return this.http.put(
      `${environment.apiUrl}/add-answer`,
      {
        slug,
        answer,
        commentId,
      },
      this.getAuthHeaders()
    );
  }

  deleteComment(slug: string, commentId: string) {
    return this.http.put(
      `${environment.apiUrl}/comment`,
      {
        slug,
        commentId,
      },
      this.getAuthHeaders()
    );
  }

  deleteReply(slug: string, commentId: string, replyId: string) {
    return this.http.put(
      `${environment.apiUrl}/comment/reply`,
      {
        slug,
        commentId,
        replyId,
      },
      this.getAuthHeaders()
    );
  }
}
