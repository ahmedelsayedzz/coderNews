import express, { RequestHandler } from "express";
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

app.listen(6000);
