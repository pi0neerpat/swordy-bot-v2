/*
  Warnings:

  - Made the column `platformId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "platformId" SET NOT NULL;
