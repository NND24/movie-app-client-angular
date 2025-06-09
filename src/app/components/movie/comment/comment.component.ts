import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../models/IUser';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() slug: string = '';
  user!: User;
  activeReply = 1;
  data: any;

  handleCommentSubmit() {}

  handleAnswerSubmit() {}

  handleDeleteReply(commentId: string, itemId: string) {}

  toggleReplyActive(commentId: string) {}

  handleDeleteComment(commentId: string) {}
}
