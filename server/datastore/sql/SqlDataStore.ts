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

  async createUser(user: User): Promise<void> {
    await this.db.run(
      "INSERT INTO users (id,email,firstName,lastName,password,username) VALUES(?,?,?,?,?,?)",
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.password,
      user.username
    );
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`Select * from users Where email=?`, email);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(`Select * from users Where username=?`, username);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>(`Select * from users Where id=?`, id);
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

  async getPost(id: string, userId: string): Promise<Post | undefined> {
    return await this.db.get<Post>(
      `SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = ? AND likes.userId = ?
      ) as liked FROM posts WHERE id = ?`,
      id,
      userId,
      id
    );
  }
  async deletePost(id: string): Promise<void> {
    await this.db.run("Delete FROM posts WHERE id = ?", id);
  }

  async createComment(comment: Comment): Promise<void> {
    await this.db.run(
      "INSERT INTO comments(id, userId, postId, comment, postedAt) VALUES(?,?,?,?,?)",
      comment.id,
      comment.userId,
      comment.postId,
      comment.comment,
      comment.postedAt
    );
  }
  async listComments(postId: string): Promise<Comment[]> {
    return await this.db.all<Comment[]>(
      "SELECT * FROM comments WHERE postId = ? ORDER BY postedAt DESC",
      postId
    );
  }
  async deleteComment(id: string): Promise<void> {
    await this.db.run("DELETE FROM comments WHERE id = ?", id);
  }

  async createLike(like: Like): Promise<void> {
    await this.db.run(
      "INSERT INTO likes(userId, postId) VALUES(?,?)",
      like.userId,
      like.postId
    );
  }
  async deleteLike(like: Like): Promise<void> {
    await this.db.run(
      "DELETE FROM likes WHERE userId = ? AND postId = ?",
      like.userId,
      like.postId
    );
  }

  async getLikes(postId: string): Promise<number> {
    try {
      // Execute SQL query to count likes for the given postId
      const result = await this.db.get<{ count: number }>(
        "SELECT COUNT(*) AS count FROM Likes WHERE postId = ?",
        postId
      );

      // Extract the count from the query result or default to 0 if no likes found
      const count = result?.count ?? 0;

      return count;
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Error fetching likes:", error);
      throw error; // Propagate the error to the caller
    }
  }
  async countComment(postId: string): Promise<number> {
    try {
      // Execute SQL query to count likes for the given postId
      const result = await this.db.get<{ count: number }>(
        "SELECT COUNT(*) AS count FROM Comments WHERE postId = ?",
        postId
      );

      // Extract the count from the query result or default to 0 if no likes found
      const count = result?.count ?? 0;

      return count;
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Error fetching likes:", error);
      throw error; // Propagate the error to the caller
    }
  }
  async exists(like: Like): Promise<boolean> {
    let awaitResult = await this.db.get<number>(
      'SELECT 1 FROM likes WHERE postId = ? and userId = ?',
      like.postId,
      like.userId
    );
    let val: boolean = awaitResult === undefined ? false : true;
    return val;
  }
}
