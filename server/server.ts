import express, { ErrorRequestHandler, RequestHandler } from "express";
import {
  createPostHandlers,
  deletePostHandler,
  listPostHandlers,
} from "./handlers/postHandler";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";
import { SignInHandler, signUpHandler } from "./handlers/authHandler";
import { requestloggrMiddlware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errHandlerMiddleware";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware";
import {
  createCommentHandler,
  deleteCommentHandler,
} from "./handlers/commentHandler";
import { createLikeHandler, getLikesHandler } from "./handlers/likeHandler";
(async () => {
  await initDb();
  dotenv.config();
  const app = express();

  app.use(express.json());
  app.use(requestloggrMiddlware);
  //Public Endpoints
  app.get("/healthz", (req, res) => {
    res.send({ status: "✌️" });
  });
  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(SignInHandler));
  //Protected Endpoints
  app.get("/v1/posts", asyncHandler(listPostHandlers));
  app.post("/v1/posts", asyncHandler(createPostHandlers));
  app.delete("/v1/posts", asyncHandler(deletePostHandler));
  app.post("/v1/comments", asyncHandler(createCommentHandler));
  app.delete("/v1/comments", asyncHandler(deleteCommentHandler));
  app.post("/v1/likes", asyncHandler(createLikeHandler));
  app.get("/v1/likes/:postId", asyncHandler(getLikesHandler));

  app.use(authMiddleware);

  app.use(errHandler);
  app.listen(process.env.PORT || 6000);
})();
