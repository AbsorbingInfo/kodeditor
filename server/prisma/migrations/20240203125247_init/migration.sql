/*
  Warnings:

  - The values [nodejs] on the enum `Runtime` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Runtime_new" AS ENUM ('Javascript');
ALTER TABLE "Code" ALTER COLUMN "runtime" TYPE "Runtime_new" USING ("runtime"::text::"Runtime_new");
ALTER TYPE "Runtime" RENAME TO "Runtime_old";
ALTER TYPE "Runtime_new" RENAME TO "Runtime";
DROP TYPE "Runtime_old";
COMMIT;
