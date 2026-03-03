-- CreateEnum
CREATE TYPE "GamePlatform" AS ENUM ('STEAM', 'EPIC_GAMES', 'GOG', 'ITCH_IO', 'PLAYSTATION', 'XBOX', 'NINTENDO', 'APPLE_APPSTORE', 'GOOGLE_PLAY', 'OFFICIAL_SITE', 'OTHER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "studioBannerUrl" TEXT,
ADD COLUMN     "studioDescription" TEXT,
ADD COLUMN     "studioDiscord" TEXT,
ADD COLUMN     "studioInstagram" TEXT,
ADD COLUMN     "studioLogoUrl" TEXT,
ADD COLUMN     "studioName" TEXT,
ADD COLUMN     "studioTwitter" TEXT,
ADD COLUMN     "studioWebsite" TEXT;

-- CreateTable
CREATE TABLE "GameLink" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "platform" "GamePlatform" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameLink" ADD CONSTRAINT "GameLink_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
