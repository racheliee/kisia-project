/*
  Warnings:

  - A unique constraint covering the columns `[modelType]` on the table `ConfusionMatrix` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `modelType` on the `ConfusionMatrix` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ConfusionMatrix" DROP COLUMN "modelType",
ADD COLUMN     "modelType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ConfusionMatrix_modelType_key" ON "ConfusionMatrix"("modelType");
