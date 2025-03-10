/*
  Warnings:

  - The primary key for the `Days` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Days` table. All the data in the column will be lost.
  - The primary key for the `UserDays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `azkar` on the `UserDays` table. All the data in the column will be lost.
  - You are about to drop the column `dailyQuraan` on the `UserDays` table. All the data in the column will be lost.
  - Added the required column `endPage` to the `UserDays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startPage` to the `UserDays` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `DayId` on the `UserDays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "UserDays" DROP CONSTRAINT "UserDays_DayId_fkey";

-- AlterTable
ALTER TABLE "Days" DROP CONSTRAINT "Days_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastPage" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "readingRate" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "UserDays" DROP CONSTRAINT "UserDays_pkey",
DROP COLUMN "azkar",
DROP COLUMN "dailyQuraan",
ADD COLUMN     "endPage" INTEGER NOT NULL,
ADD COLUMN     "startPage" INTEGER NOT NULL,
DROP COLUMN "DayId",
ADD COLUMN     "DayId" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "UserDays_pkey" PRIMARY KEY ("userId", "DayId");

-- AddForeignKey
ALTER TABLE "UserDays" ADD CONSTRAINT "UserDays_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "Days"("Date") ON DELETE RESTRICT ON UPDATE CASCADE;
