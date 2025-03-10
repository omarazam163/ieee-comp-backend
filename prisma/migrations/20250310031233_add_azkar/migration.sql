-- DropForeignKey
ALTER TABLE "UserDays" DROP CONSTRAINT "UserDays_DayId_fkey";

-- DropForeignKey
ALTER TABLE "UserDays" DROP CONSTRAINT "UserDays_userId_fkey";

-- AlterTable
ALTER TABLE "Days" ADD CONSTRAINT "Days_pkey" PRIMARY KEY ("Date");

-- DropIndex
DROP INDEX "Days_Date_key";

-- CreateTable
CREATE TABLE "UserAzkarDays" (
    "userId" TEXT NOT NULL,
    "DayId" TIMESTAMP(3) NOT NULL,
    "morningAzkar" BOOLEAN NOT NULL DEFAULT false,
    "eveningAzkar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserAzkarDays_pkey" PRIMARY KEY ("userId","DayId")
);

-- AddForeignKey
ALTER TABLE "UserDays" ADD CONSTRAINT "UserDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDays" ADD CONSTRAINT "UserDays_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "Days"("Date") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAzkarDays" ADD CONSTRAINT "UserAzkarDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAzkarDays" ADD CONSTRAINT "UserAzkarDays_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "Days"("Date") ON DELETE CASCADE ON UPDATE CASCADE;
