/*
  Warnings:

  - Made the column `videoId` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoId` on table `Likes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_user_id_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "videoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "videoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
