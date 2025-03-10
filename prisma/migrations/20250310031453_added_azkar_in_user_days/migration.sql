/*
  Warnings:

  - You are about to drop the `UserAzkarDays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAzkarDays" DROP CONSTRAINT "UserAzkarDays_DayId_fkey";

-- DropForeignKey
ALTER TABLE "UserAzkarDays" DROP CONSTRAINT "UserAzkarDays_userId_fkey";

-- AlterTable
ALTER TABLE "UserDays" ADD COLUMN     "eveningAzkar" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "morningAzkar" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "UserAzkarDays";
