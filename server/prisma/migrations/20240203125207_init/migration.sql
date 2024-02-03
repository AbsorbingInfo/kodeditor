/*
  Warnings:

  - The `content` column on the `Code` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Code" DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];
