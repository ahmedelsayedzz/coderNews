import { Post, User } from "./types";
//Api Post
export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}
export type CreatePostRequest = Pick<Post, "title" | "url">;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post[];
}
//Api User
export type SignUpRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "username" | "password"
>;
export interface SignUpResponse {
  jwt: string;
}
export interface SignInRequest {
  login: string; //username or email
  password: string;
}
export type SignInResponse = {
  user: Pick<User, "email" | "firstName" | "lastName" | "username" | "id">;
  jwt: string;
};
