import { Prisma, PrismaClient } from "@prisma/client";

import { Comments } from "../domain/Comments";
import { Likes } from "../domain/Likes";
import { User } from "../domain/User";
import { Video, VideoCreateDTO, VideoUpdateDTO } from "../domain/Video";
import {
  VideoOrderBy,
  VideoRepository,
  VideoSort,
  VideoState
} from "../domain/VideoRepository";

const VIDEOS_FULL_INCLUDE = {
  author: true,
  comments: {
    include: {
      user: true
    }
  },
  likes: {
    include: {
      user: true
    }
  }
};

const videoWithAllIncludes = Prisma.validator<Prisma.VideoArgs>()({
  include: VIDEOS_FULL_INCLUDE
});

type PrismaVideoFullInclude = Prisma.VideoGetPayload<
  typeof videoWithAllIncludes
>;

export class PrismaVideoRepository implements VideoRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(video: VideoCreateDTO, author: User): Promise<Video> {
    try {
      const newVideo = await this.db.video.create({
        data: {
          ...video,
          author: {
            connect: {
              id: author.id
            }
          }
        },
        include: VIDEOS_FULL_INCLUDE
      });

      // return { ...newVideo, comments: [], likes: [] };
      return this.dbResultAdapter(newVideo);
    } catch (err) {
      return Promise.reject();
    }
  }

  async getById(id: bigint): Promise<Video | null> {
    try {
      const result = await this.db.video.findUnique({
        where: {
          id
        },
        include: VIDEOS_FULL_INCLUDE
      });

      if (!result) {
        return null;
      }

      return this.dbResultAdapter(result);
    } catch (err) {
      return Promise.reject();
    }
  }

  async edit(id: bigint, videUpdate: VideoUpdateDTO): Promise<Video> {
    try {
      const editedVideo = await this.db.video.update({
        where: {
          id
        },
        data: {
          ...videUpdate
        },
        include: VIDEOS_FULL_INCLUDE
      });

      return this.dbResultAdapter(editedVideo);
    } catch (err) {
      return Promise.reject();
    }
  }

  async delete(id: bigint): Promise<Video> {
    try {
      const deletedVideo = await this.db.video.delete({
        where: {
          id
        },
        include: VIDEOS_FULL_INCLUDE
      });

      return this.dbResultAdapter(deletedVideo);
    } catch (err) {
      return Promise.reject();
    }
  }

  async getList(
    state: VideoState = "PUBLIC",
    order: VideoOrderBy = "created_at",
    sort: VideoSort = "desc"
  ): Promise<Video[]> {
    try {
      const orderBy: Record<string, VideoSort> = {};
      orderBy[`${order}`] = sort;

      let where;
      if (state !== "ANY") {
        where = {
          isPrivate: state === "PRIVATE" ? true : false
        };
      }

      const result = await this.db.video.findMany({
        where,
        orderBy,
        include: VIDEOS_FULL_INCLUDE
      });

      return result.map((item) => this.dbResultAdapter(item));
    } catch (err) {
      return Promise.reject();
    }
  }

  async getListByUser(
    authorId: bigint,
    state: VideoState = "PUBLIC",
    order: VideoOrderBy = "created_at",
    sort: VideoSort = "desc"
  ): Promise<Video[]> {
    try {
      const orderBy: Record<string, VideoSort> = {};
      orderBy[`${order}`] = sort;

      let where;
      if (state !== "ANY") {
        where = {
          isPrivate: state === "PRIVATE" ? true : false
        };
      }

      const result = await this.db.video.findMany({
        where: {
          ...where,
          authorId
        },
        orderBy,
        include: VIDEOS_FULL_INCLUDE
      });

      return result.map((item) => this.dbResultAdapter({ ...item }));
    } catch (err) {
      return Promise.reject();
    }
  }

  private dbResultAdapter(videoDb: PrismaVideoFullInclude) {
    const likes = videoDb.likes.map((like) => Likes.create({ ...like }));
    const comments = videoDb.comments.map((comment) =>
      Comments.create({ ...comment })
    );

    const video = Video.create({ ...videoDb }, comments, likes);

    return video;
  }
}
