/*
  Warnings:

  - You are about to drop the column `Userid` on the `Days` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Date]` on the table `Days` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Days" DROP COLUMN "Userid";

-- CreateIndex
CREATE UNIQUE INDEX "Days_Date_key" ON "Days"("Date");
