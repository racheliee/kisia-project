/*
  Warnings:

  - Changed the type of `modelType` on the `ConfusionMatrix` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ModelType" AS ENUM ('STATIC', 'DYNAMIC', 'AI');

-- DropIndex
DROP INDEX "ConfusionMatrix_modelType_key";

-- AlterTable
ALTER TABLE "ConfusionMatrix" DROP COLUMN "modelType",
ADD COLUMN     "modelType" "ModelType" NOT NULL;
