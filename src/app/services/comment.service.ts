import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComment(slug: string) {
    return this.http.get(`${environment.apiUrl}/get-comment/${slug}`);
  }

  addNewComment(slug: string, comment: string) {
    return this.http.put(`${environment.apiUrl}/add-comment`, {
      slug,
      comment,
    });
  }

  addNewAnswer(slug: string, answer: string, commentId: string) {
    return this.http.put(`${environment.apiUrl}/add-answer`, {
      slug,
      answer,
      commentId,
    });
  }

  deleteComment(slug: string, commentId: string) {
    return this.http.put(`${environment.apiUrl}/comment`, {
      slug,
      commentId,
    });
  }

  deleteReply(slug: string, commentId: string, replyId: string) {
    return this.http.put(`${environment.apiUrl}/comment/reply`, {
      slug,
      commentId,
      replyId,
    });
  }
}
