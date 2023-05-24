import { User } from "./User";
import { Video, VideoCreateDTO, VideoUpdateDTO } from "./Video";

export type VideoState = "PUBLIC" | "PRIVATE" | "ANY";
export type VideoOrderBy = "created_at" | "likesCount";
export type VideoSort = "asc" | "desc";

export interface VideoRepository {
  create(video: VideoCreateDTO, author: User): Promise<Video>;
  getById(id: bigint): Promise<Video | null>;
  edit(id: bigint, videUpdate: VideoUpdateDTO): Promise<Video>;
  delete(id: bigint): Promise<Video>;
  getList(
    state?: VideoState,
    order?: VideoOrderBy,
    sort?: VideoSort
  ): Promise<Video[]>;
  getListByUser(
    authorId: bigint,
    state?: VideoState,
    order?: VideoOrderBy,
    sort?: VideoSort
  ): Promise<Video[]>;
}
