/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('ADMIN', 'STANDARD_USER', 'PREMIUM_USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "type" "UserTypes" NOT NULL DEFAULT 'STANDARD_USER';
