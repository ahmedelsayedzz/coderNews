import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostRequest,
  ListPostResponse,
} from "../api";
import { DB } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";

export const listPostHandlers: ExpressHandler<
  ListPostRequest,
  ListPostResponse
> = (req, res) => {
  res.send({ posts: DB.listPosts() });
};

export const createPostHandlers: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send(`title is required `);
  }
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
