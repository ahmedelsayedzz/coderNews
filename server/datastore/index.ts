import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { inMemoryDatastore } from "./memoryDB";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { SqlDataStore } from "./sql/SqlDataStore";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}
export let db: Datastore;
export async function initDb() {
  //   db = new inMemoryDatastore();
  db = await new SqlDataStore().openDb();
}
