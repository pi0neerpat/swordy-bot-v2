/*
  Warnings:

  - A unique constraint covering the columns `[discordAuthId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordAuthId" TEXT;

-- CreateTable
CREATE TABLE "DiscordAuth" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordAuthId_unique" ON "User"("discordAuthId");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("discordAuthId") REFERENCES "DiscordAuth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
