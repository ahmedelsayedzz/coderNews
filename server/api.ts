import { Comment, Like, Post, User } from "./types";
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
export type DeletePostRequest = { postId: string };
export type DeletePostResponse = {};
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
// Comment APIs
export type CreateCommentRequest = Pick<
  Comment,
  "userId" | "postId" | "comment"
>;
export interface CreateCommentResponse {}
export type GetCommentsRequest = { postId: string | undefined };
export interface GetCommentsResponse {
  comments: Comment[];
}
export type DeleteCommentRequest = { commentId: string };
export type DeleteCommentResponse = {};

export type CreateLikeRequest = Like;
export interface CreateLikeResponse {}
export type GetLikesRequest = { postId: string };
export interface GetLikesResponse {
  likes: Number;
}
