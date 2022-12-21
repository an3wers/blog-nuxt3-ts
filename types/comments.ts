export interface IComment {
  id?: string;
  email: string;
  createdAt: Date;
  publish: boolean;
  text: string;
  postId: string;
  name: string;
}
