-- CreateTable
CREATE TABLE "AuthDetail" (
    "id" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordAuth" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "authDetailId" TEXT,
    "platform" TEXT,
    "oauthState" TEXT,
    "iconUrl" TEXT,
    "username" TEXT,
    "currentSessionGuildId" TEXT,
    "discordAuthId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT,
    "description" TEXT,

    PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userGuilds" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_userRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.address_unique" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_authDetailId_unique" ON "User"("authDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordAuthId_unique" ON "User"("discordAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "_userGuilds_AB_unique" ON "_userGuilds"("A", "B");

-- CreateIndex
CREATE INDEX "_userGuilds_B_index" ON "_userGuilds"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_userRoles_AB_unique" ON "_userRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_userRoles_B_index" ON "_userRoles"("B");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("currentSessionGuildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("discordAuthId") REFERENCES "DiscordAuth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userGuilds" ADD FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userGuilds" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userRoles" ADD FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userRoles" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
