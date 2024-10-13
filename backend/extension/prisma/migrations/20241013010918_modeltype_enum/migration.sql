/*
  Warnings:

  - The values [STATIC,DYNAMIC,AI] on the enum `ModelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelType_new" AS ENUM ('url', 'static', 'dynamic');
ALTER TABLE "ConfusionMatrix" ALTER COLUMN "modelType" TYPE "ModelType_new" USING ("modelType"::text::"ModelType_new");
ALTER TYPE "ModelType" RENAME TO "ModelType_old";
ALTER TYPE "ModelType_new" RENAME TO "ModelType";
DROP TYPE "ModelType_old";
COMMIT;
