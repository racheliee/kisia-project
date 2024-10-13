/*
  Warnings:

  - A unique constraint covering the columns `[modelType]` on the table `ConfusionMatrix` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfusionMatrix_modelType_key" ON "ConfusionMatrix"("modelType");
