/*
  Warnings:

  - You are about to drop the column `accessedAt` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `urlId` on the `History` table. All the data in the column will be lost.
  - The primary key for the `Url` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numFeedback` on the `Url` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expiration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Announcements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `detectedBy` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMalicious` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_urlId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "accessedAt",
DROP COLUMN "urlId",
ADD COLUMN     "confidenceScore" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "detectedBy" "DETECTOR" NOT NULL,
ADD COLUMN     "isMalicious" BOOLEAN NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Url" DROP CONSTRAINT "Url_pkey",
DROP COLUMN "numFeedback",
ADD COLUMN     "dynamicResult" BOOLEAN,
ADD COLUMN     "falseNeg" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "staticResult" BOOLEAN,
ADD COLUMN     "urlResult" BOOLEAN,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Url_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "expiration",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Announcements";

-- CreateTable
CREATE TABLE "ConfusionMatrix" (
    "id" SERIAL NOT NULL,
    "modelType" "DETECTOR" NOT NULL,
    "truePos" INTEGER NOT NULL DEFAULT 0,
    "trueNeg" INTEGER NOT NULL DEFAULT 0,
    "falsePos" INTEGER NOT NULL DEFAULT 0,
    "falseNeg" INTEGER NOT NULL DEFAULT 0,
    "f1Score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfusionMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestSummary" (
    "id" SERIAL NOT NULL,
    "period" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "totalRequests" INTEGER NOT NULL,
    "aiRequests" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
