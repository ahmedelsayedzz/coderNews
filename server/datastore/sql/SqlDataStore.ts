import { Datastore } from "..";
import { User, Post, Like, Comment } from "../../types";
import sqlite3 from "sqlite3";
import { open as sqliteOpen, Database } from "sqlite";
import path from "path";

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    // open the database
    this.db = await sqliteOpen({
      filename: path.join(__dirname, "codersquare.sqlite"),
      driver: sqlite3.Database,
    });
    this.db.run("PRAGMA foreign_KEY=ON;");

    this.db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });
    return this;
  }

  createUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  listPost(): Promise<Post[]> {
    return this.db.all<Post[]>("Select * From posts");
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts (id,title,url,postedAt,userId) values(?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId
    );
  }
  getPost(id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePost(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
