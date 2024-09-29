/*
  Warnings:

  - You are about to drop the `UserUrl` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DETECTOR" AS ENUM ('DATABASE', 'API', 'AI_MODEL');

-- DropForeignKey
ALTER TABLE "UserUrl" DROP CONSTRAINT "UserUrl_urlId_fkey";

-- DropForeignKey
ALTER TABLE "UserUrl" DROP CONSTRAINT "UserUrl_userId_fkey";

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "confidenceScore" DOUBLE PRECISION,
ADD COLUMN     "detectedBy" "DETECTOR" NOT NULL DEFAULT 'DATABASE',
ADD COLUMN     "falsePos" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyRequests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "expiration" TIMESTAMP(3),
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "requestsLimit" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "UserUrl";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "urlId" INTEGER NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
