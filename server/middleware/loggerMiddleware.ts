import { RequestHandler } from "express";

export const requestloggrMiddlware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, `body : `, req.body);
  next();
};
