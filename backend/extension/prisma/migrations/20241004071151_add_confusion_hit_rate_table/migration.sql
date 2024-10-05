-- CreateTable
CREATE TABLE "ConfusionHitRate" (
    "id" SERIAL NOT NULL,
    "confidenceRange" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfusionHitRate_pkey" PRIMARY KEY ("id")
);
