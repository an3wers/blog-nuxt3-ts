export interface IComment {
  id: string;
  email: string;
  createdAt: Date;
  publish: boolean;
  text: string;
  postId: string;
  name: string;
}

export interface ICommentNew {
  email: string;
  createdAt: Date;
  publish: boolean;
  text: string;
  postId: string;
  name: string;
}

export interface ICommentUpdate {
  id: string;
  email: string;
  createdAt: Date;
  publish: boolean;
  text: string;
  postId: string;
  name: string;
}