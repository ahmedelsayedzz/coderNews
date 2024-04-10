import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandlers, listPostHandlers } from "./handlers/postHandler";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";
import { SignInHandler, signUpHandler } from "./handlers/userHandler";

(async () => {
  await initDb();
  const app = express();

  const requestloggrMiddlware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, `body : `, req.body);
    next();
  };
  app.use(express.json());
  app.use(requestloggrMiddlware);

  app.get("/v1/posts", asyncHandler(listPostHandlers));
  app.post("/v1/posts", asyncHandler(createPostHandlers));
  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(SignInHandler));
  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("Uncaught exception:", err);
    return res
      .status(500)
      .send("Oops, an unexpected error occurred, please try again");
  };
  app.use(errHandler);
  app.listen(6000);
})();
