import {
  CountCommentsRequest,
  CountCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
} from "../api";
import { db } from "../datastore";
import { ExpressHandler, Comment } from "../types";
import crypto from "crypto";

//Create Comment Handler
export const createCommentHandler: ExpressHandler<
  CreateCommentRequest,
  CreateCommentResponse
> = async (req, res) => {
  if (req.body.postId === "" || req.body.postId === undefined)
    return res.status(400).send({ error: "No Post Id" });

  if (req.body.userId === "" || req.body.userId === undefined)
    return res.status(400).send({ error: "No user Id" });

  if (req.body.comment === "" || req.body.comment === undefined)
    return res.status(400).send({ error: "No comment" });

  const commentForInsertion: Comment = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    postId: req.body.postId,
    userId: req.body.userId,
    comment: req.body.comment,
  };
  await db.createComment(commentForInsertion);
  return res.sendStatus(200);
};

//Delete Comment Handler
export const deleteCommentHandler: ExpressHandler<
  DeleteCommentRequest,
  DeleteCommentResponse
> = async (req, res) => {
  if (req.body.commentId === "" || req.body.commentId === undefined)
    return res.status(400).send({ error: "No comment ID" });
  await db.deleteComment(req.body.commentId);
  return res.sendStatus(200);
};
export const getCommentsHandler: ExpressHandler<
  CountCommentsRequest,
  CountCommentsResponse
> = async (request, response) => {
  let params: any = request.params;
  const count: Number = await db.countComment(params.postId);
  console.log(count);
  return response.send({ comments: count });
};
