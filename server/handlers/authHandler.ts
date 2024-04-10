import expressAsyncHandler from "express-async-handler";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from "crypto";
export const signUpHandler: ExpressHandler<
  SignUpRequest,
  SignUpResponse
> = async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).send({ error: "all fields are required" });
  }
  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));
  if (existing) {
    return res.status(403).send({ error: "user already exists" });
  }
  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    username,
    email,
    password,
  };

  await db.createUser(user);
  return res.sendStatus(200);
};
export const SignInHandler: ExpressHandler<
  SignInRequest,
  SignInResponse
> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400);
  }
  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }
  return res.status(200).send({
    email: existing.email,
    firstName: existing.firstName,
    lastName: existing.lastName,
    id: existing.id,
    username: existing.username,
  });
};
