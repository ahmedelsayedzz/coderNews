import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandlers, listPostHandlers } from "./handlers/postHandler";
const app = express();

const requestloggrMiddlware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, `body : `, req.body);
  next();
};
app.use(express.json());
app.use(requestloggrMiddlware);

app.get("/posts", listPostHandlers);
app.post("/posts", createPostHandlers);
export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Uncaught exception:", err);
  return res
    .status(500)
    .send("Oops, an unexpected error occurred, please try again");
};
app.use(errHandler);
app.listen(6000);
