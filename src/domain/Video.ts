import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { User } from "./User";

type createVideoProps = {
  id: bigint;
  title: string;
  description: string;
  credits: string;
  likesCount: number;
  videoURL: string;
  isPrivate: boolean;

  author: User;

  created_at: Date;
  publication_date: Date;

  comments: Comments[];
  likes: Likes[];
};

export class Video {
  constructor(
    readonly id: bigint,
    readonly title: string,
    readonly description: string,
    readonly credits: string,
    readonly likesCount: number,
    readonly videoURL: string,
    readonly isPrivate: boolean,

    readonly author: User,

    readonly created_at: Date,
    readonly publication_date: Date,

    readonly comments: Comments[],
    readonly likes: Likes[]
  ) {}

  static create(
    {
      id,
      title,
      description,
      credits,
      likesCount,
      videoURL,
      isPrivate,

      author,

      created_at,
      publication_date
    }: createVideoProps,
    comments: Comments[],
    likes: Likes[]
  ) {
    return new Video(
      id,
      title,
      description,
      credits,
      likesCount,
      videoURL,
      isPrivate,
      author,
      created_at,
      publication_date,
      comments,
      likes
    );
  }
}

export type VideoCreateDTO = Pick<
  Video,
  "title" | "credits" | "description" | "isPrivate" | "videoURL"
>;

export type VideoUpdateDTO = Partial<
  Omit<VideoCreateDTO, "author" | "comments" | "likes">
>;
