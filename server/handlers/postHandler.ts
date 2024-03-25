import { DB } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";

export const listPostHandlers: ExpressHandler<{}, {}> = (req, res) => {
  res.send({ posts: DB.listPosts() });
};
type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
interface CreatePostResponse {}
export const createPostHandlers: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  DB.createPost(post);
  res.sendStatus(200);
};
