import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  ListPostRequest,
  ListPostResponse,
} from "../api";
import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";

import { RequestHandler } from "express";

export const listPostHandlers: RequestHandler<
  ListPostRequest,
  ListPostResponse
> = async (req, res) => {
  const posts = await db.listPost(); // Await the promise to get the array of posts
  res.send({ posts });
};

export const createPostHandlers: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  if (!req.body.title) {
    return res.status(400);
  }
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
  };
  await db.createPost(post);
  res.sendStatus(200);
};
export const deletePostHandler: ExpressHandler<
  DeletePostRequest,
  DeletePostResponse
> = async (req, res) => {
  if (req.body.postId === "" || req.body.postId === undefined)
    return res.sendStatus(404);
  db.deletePost(req.body.postId);
  return res.sendStatus(200);
};
