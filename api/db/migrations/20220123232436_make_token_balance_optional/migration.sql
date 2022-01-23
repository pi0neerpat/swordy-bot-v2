-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_guildId_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "balance" SET DEFAULT E'1000000000000000000';

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User.address_unique" RENAME TO "User_address_key";

-- RenameIndex
ALTER INDEX "User_authDetailId_unique" RENAME TO "User_authDetailId_key";

-- RenameIndex
ALTER INDEX "User_discordAuthId_unique" RENAME TO "User_discordAuthId_key";
