/*
  Warnings:

  - You are about to drop the column `handle` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "handle",
ADD COLUMN     "username" TEXT;
