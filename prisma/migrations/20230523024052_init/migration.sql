-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "credits" TEXT NOT NULL DEFAULT '',
    "likes_count" BIGINT NOT NULL DEFAULT 0,
    "video_url" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "user_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" BIGSERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" BIGINT,
    "videoId" BIGINT,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT,
    "videoId" BIGINT,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_email_name_idx" ON "Users"("email", "name");

-- CreateIndex
CREATE INDEX "Videos_likes_count_user_id_title_idx" ON "Videos"("likes_count" DESC, "user_id" DESC, "title" DESC);

-- CreateIndex
CREATE INDEX "Comments_userId_videoId_created_at_idx" ON "Comments"("userId" DESC, "videoId" DESC, "created_at" DESC);

-- CreateIndex
CREATE INDEX "Likes_userId_videoId_idx" ON "Likes"("userId" DESC, "videoId" DESC);

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
