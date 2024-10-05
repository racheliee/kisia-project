-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('ADMIN', 'STANDARD_USER', 'PREMIUM_USER');

-- CreateEnum
CREATE TYPE "DETECTOR" AS ENUM ('DATABASE', 'API', 'AI_MODEL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "UserTypes" NOT NULL DEFAULT 'STANDARD_USER',
    "dailyRequests" INTEGER NOT NULL DEFAULT 0,
    "requestsLimit" INTEGER NOT NULL DEFAULT 3,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "isMalicious" BOOLEAN NOT NULL,
    "detectedBy" "DETECTOR" NOT NULL DEFAULT 'DATABASE',
    "urlResult" BOOLEAN,
    "staticResult" BOOLEAN,
    "dynamicResult" BOOLEAN,
    "accessCount" INTEGER NOT NULL DEFAULT 1,
    "falsePos" INTEGER NOT NULL DEFAULT 0,
    "falseNeg" INTEGER NOT NULL DEFAULT 0,
    "confidenceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isMalicious" BOOLEAN NOT NULL,
    "detectedBy" "DETECTOR" NOT NULL,
    "confidenceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfusionMatrix" (
    "id" SERIAL NOT NULL,
    "modelType" TEXT NOT NULL,
    "truePos" INTEGER NOT NULL DEFAULT 0,
    "trueNeg" INTEGER NOT NULL DEFAULT 0,
    "falsePos" INTEGER NOT NULL DEFAULT 0,
    "falseNeg" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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

-- CreateTable
CREATE TABLE "ConfidenceHitRate" (
    "id" SERIAL NOT NULL,
    "confidenceRange" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfidenceHitRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Url_url_key" ON "Url"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ConfusionMatrix_modelType_key" ON "ConfusionMatrix"("modelType");

-- CreateIndex
CREATE UNIQUE INDEX "ConfidenceHitRate_confidenceRange_key" ON "ConfidenceHitRate"("confidenceRange");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
