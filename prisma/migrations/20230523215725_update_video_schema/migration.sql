/*
  Warnings:

  - You are about to alter the column `likes_count` on the `Videos` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Made the column `user_id` on table `Videos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_user_id_fkey";

-- AlterTable
ALTER TABLE "Videos" ALTER COLUMN "likes_count" SET DATA TYPE INTEGER,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
