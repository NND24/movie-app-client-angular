import { User } from './IUser';

export interface CommentReply {
  _id: string;
  user: User;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInt {
  _id: string;
  user: User;
  comment: string;
  commentReplies: CommentReply[];
  createdAt: string;
  updatedAt: string;
}
