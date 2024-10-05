/*
  Warnings:

  - The primary key for the `Url` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Url` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Url" DROP CONSTRAINT "Url_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "accessCount" SET DEFAULT 1,
ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("id");
