-- CreateTable
CREATE TABLE "Days" (
    "id" TEXT NOT NULL,
    "Userid" TEXT,
    "Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDays" (
    "userId" TEXT NOT NULL,
    "DayId" TEXT NOT NULL,
    "azkar" BOOLEAN NOT NULL DEFAULT false,
    "dailyQuraan" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserDays_pkey" PRIMARY KEY ("userId","DayId")
);

-- CreateTable
CREATE TABLE "_DaysToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DaysToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DaysToUser_B_index" ON "_DaysToUser"("B");

-- AddForeignKey
ALTER TABLE "UserDays" ADD CONSTRAINT "UserDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDays" ADD CONSTRAINT "UserDays_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "Days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DaysToUser" ADD CONSTRAINT "_DaysToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DaysToUser" ADD CONSTRAINT "_DaysToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
