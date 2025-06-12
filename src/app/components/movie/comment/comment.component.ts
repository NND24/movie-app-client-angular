import { DatePipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { User } from '../../../models/IUser';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() slug: string = '';
  user = computed(() => this.userService.user());
  activeReply: string = '';
  comments: any;
  comment: string = '';
  reply: string = '';

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComment(this.slug).subscribe((res: any) => {
      this.comments = res.comments;
    });
  }

  handleCommentSubmit() {
    this.commentService
      .addNewComment(this.slug, this.comment)
      .subscribe((res) => {
        this.comment = '';
        this.loadComments();
      });
  }

  handleAnswerSubmit(commentId: string) {
    this.commentService
      .addNewAnswer(this.slug, this.reply, commentId)
      .subscribe(() => {
        this.reply = '';
        this.loadComments();
      });
  }

  handleDeleteReply(commentId: string, itemId: string) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa phản hồi này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService
          .deleteReply(this.slug, commentId, itemId)
          .subscribe(() => {
            this.loadComments();
          });
      }
    });
  }

  toggleReplyActive(commentId: string) {
    this.reply = '';
    if (this.activeReply === commentId) {
      this.activeReply = '';
    } else {
      this.activeReply = commentId;
    }
  }

  handleDeleteComment(commentId: string) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa bình luận này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService
          .deleteComment(this.slug, commentId)
          .subscribe(() => {
            this.loadComments();
          });
      }
    });
  }
}
