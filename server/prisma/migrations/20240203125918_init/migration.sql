/*
  Warnings:

  - The `output` column on the `Code` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Code" DROP COLUMN "output",
ADD COLUMN     "output" TEXT[],
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DATA TYPE TEXT;
