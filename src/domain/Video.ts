import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { User } from "./User";

export class Video {
  constructor(
    readonly id: bigint,
    readonly title: string,
    readonly description: string,
    readonly credits: string,
    readonly likeCount: number,
    readonly videoURL: string,
    readonly isPrivate: boolean,

    readonly author: User,

    readonly comments?: Comments[],
    readonly likes?: Likes[]
  ) {}
}

export type VideoWithoutIdDTO = Omit<Video, "id">;
export type VideoUpdateDTO = Partial<VideoWithoutIdDTO>;
