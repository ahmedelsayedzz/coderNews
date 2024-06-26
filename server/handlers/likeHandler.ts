import {
  CreateLikeRequest,
  CreateLikeResponse,
  GetLikesRequest,
  GetLikesResponse,
} from "../api";
import { db } from "../datastore";
import { ExpressHandler, Like } from "../types";

export const createLikeHandler: ExpressHandler<
  CreateLikeRequest,
  CreateLikeResponse
> = async (req, res) => {
  if (!req.body.postId) {
    return res.status(400).send({ error: "No Post Id" });
  }

  if (!req.body.userId) {
    return res.status(400).send({ error: "No User Id" });
  }
  let found = await db.exists({
    postId: req.body.postId,
    userId: req.body.userId,
  });
  if (found) {
    return res.status(400).send({ error: `Duplicate like` });
  }
  //Valid like Object
  const likeForInsert: Like = {
    postId: req.body.postId,
    userId: req.body.userId,
  };

  db.createLike(likeForInsert);
  return res.sendStatus(200);
};

export const getLikesHandler: ExpressHandler<
  GetLikesRequest,
  GetLikesResponse
> = async (request, response) => {
  let params: any = request.params;
  const count: Number = await db.getLikes(params.postId);
  console.log(count);
  return response.send({ likes: count });
};
