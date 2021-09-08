/*
  Warnings:

  - The `tokenId` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chainId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractAddress` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_tokenId_fkey";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "contractAddress" TEXT NOT NULL,
ADD COLUMN     "iconUrl" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "uri" TEXT,
ADD COLUMN     "website" TEXT,
DROP COLUMN "tokenId",
ADD COLUMN     "tokenId" INTEGER;

-- DropTable
DROP TABLE "Token";
