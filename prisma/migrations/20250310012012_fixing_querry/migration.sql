/*
  Warnings:

  - The primary key for the `UserDays` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserDays" DROP CONSTRAINT "UserDays_DayId_fkey";

-- AlterTable
ALTER TABLE "Days" ALTER COLUMN "Date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "UserDays" DROP CONSTRAINT "UserDays_pkey",
ALTER COLUMN "DayId" SET DATA TYPE DATE,
ADD CONSTRAINT "UserDays_pkey" PRIMARY KEY ("userId", "DayId");

-- AddForeignKey
ALTER TABLE "UserDays" ADD CONSTRAINT "UserDays_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "Days"("Date") ON DELETE RESTRICT ON UPDATE CASCADE;
