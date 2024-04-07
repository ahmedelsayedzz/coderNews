import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { inMemoryDatastore } from "./memoryDB";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}
export const DB = new inMemoryDatastore();
