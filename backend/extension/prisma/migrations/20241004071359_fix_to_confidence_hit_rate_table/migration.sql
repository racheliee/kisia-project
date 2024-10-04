/*
  Warnings:

  - You are about to drop the `ConfusionHitRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ConfusionHitRate";

-- CreateTable
CREATE TABLE "ConfidenceHitRate" (
    "id" SERIAL NOT NULL,
    "confidenceRange" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfidenceHitRate_pkey" PRIMARY KEY ("id")
);
