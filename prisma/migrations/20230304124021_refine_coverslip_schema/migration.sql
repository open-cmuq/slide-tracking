/*
  Warnings:

  - You are about to drop the column `userId` on the `CoverslipFile` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `CoverslipFile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CoverslipFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "coverslipId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CoverslipFile_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CoverslipFile_coverslipId_fkey" FOREIGN KEY ("coverslipId") REFERENCES "Coverslip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CoverslipFile" ("coverslipId", "createdAt", "id", "name", "size", "updatedAt") SELECT "coverslipId", "createdAt", "id", "name", "size", "updatedAt" FROM "CoverslipFile";
DROP TABLE "CoverslipFile";
ALTER TABLE "new_CoverslipFile" RENAME TO "CoverslipFile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
