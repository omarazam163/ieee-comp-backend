/*
  Warnings:

  - You are about to drop the column `endPage` on the `UserDays` table. All the data in the column will be lost.
  - You are about to drop the column `startPage` on the `UserDays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDays" DROP COLUMN "endPage",
DROP COLUMN "startPage",
ADD COLUMN     "pageRead" INTEGER NOT NULL DEFAULT 0;
