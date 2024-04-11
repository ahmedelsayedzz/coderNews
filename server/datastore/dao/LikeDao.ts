import { Like } from "../../types";

export interface LikeDao {
  createLike(like: Like): Promise<void>;
  getLikes(postId: string): Promise<number>;
}
