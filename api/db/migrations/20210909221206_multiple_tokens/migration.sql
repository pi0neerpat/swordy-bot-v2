/*
  Warnings:

  - You are about to drop the column `balance` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `contractAddress` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseUrl` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `uri` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "balance",
DROP COLUMN "chainId",
DROP COLUMN "contractAddress",
DROP COLUMN "iconUrl",
DROP COLUMN "purchaseUrl",
DROP COLUMN "tokenId",
DROP COLUMN "type",
DROP COLUMN "uri",
DROP COLUMN "website";

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "purchaseUrl" TEXT,
    "balance" TEXT,
    "iconUrl" TEXT,
    "roleId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
