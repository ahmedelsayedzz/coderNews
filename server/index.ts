import express, { RequestHandler } from "express";
import { DB } from "./datastore";
const app = express();

const requestloggrMiddlware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, `body : `, req.body);
  next();
};
app.use(express.json());
app.use(requestloggrMiddlware);

app.get("/posts", (req, res) => {
  res.send({ posts: DB.listPosts() });
});
app.post("/posts", (req, res) => {
  const post = req.body;
  DB.createPost(post);
  res.sendStatus(200);
});

app.listen(3000);
