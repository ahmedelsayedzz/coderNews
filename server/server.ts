import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandlers, listPostHandlers } from "./handlers/postHandler";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";
import { SignInHandler, signUpHandler } from "./handlers/authHandler";
import { requestloggrMiddlware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errHandlerMiddleware";

(async () => {
  await initDb();
  const app = express();

  app.use(express.json());
  app.use(requestloggrMiddlware);

  app.get("/v1/posts", asyncHandler(listPostHandlers));
  app.post("/v1/posts", asyncHandler(createPostHandlers));
  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(SignInHandler));

  app.use(errHandler);
  app.listen(6000);
})();
