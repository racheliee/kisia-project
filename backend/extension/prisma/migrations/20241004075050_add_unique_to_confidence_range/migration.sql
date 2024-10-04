/*
  Warnings:

  - A unique constraint covering the columns `[confidenceRange]` on the table `ConfidenceHitRate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfidenceHitRate_confidenceRange_key" ON "ConfidenceHitRate"("confidenceRange");
