/*
  Warnings:

  - You are about to drop the column `userId` on the `Coverslip` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StainingField` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Staining` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Coverslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserId` to the `StainingField` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserId` to the `Staining` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coverslip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shape" TEXT NOT NULL,
    "coating" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "positionX" TEXT NOT NULL,
    "positionY" TEXT NOT NULL,
    "slideId" TEXT NOT NULL,
    "specimen" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Coverslip_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Coverslip_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "Slide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Coverslip" ("coating", "createdAt", "id", "positionX", "positionY", "shape", "slideId", "specimen", "updatedAt") SELECT "coating", "createdAt", "id", "positionX", "positionY", "shape", "slideId", "specimen", "updatedAt" FROM "Coverslip";
DROP TABLE "Coverslip";
ALTER TABLE "new_Coverslip" RENAME TO "Coverslip";
CREATE TABLE "new_StainingField" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "stainingId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StainingField_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StainingField_stainingId_fkey" FOREIGN KEY ("stainingId") REFERENCES "Staining" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StainingField" ("createdAt", "id", "name", "stainingId", "updatedAt", "value") SELECT "createdAt", "id", "name", "stainingId", "updatedAt", "value" FROM "StainingField";
DROP TABLE "StainingField";
ALTER TABLE "new_StainingField" RENAME TO "StainingField";
CREATE TABLE "new_Staining" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "coverslipId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staining_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Staining_coverslipId_fkey" FOREIGN KEY ("coverslipId") REFERENCES "Coverslip" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Staining" ("coverslipId", "createdAt", "id", "updatedAt") SELECT "coverslipId", "createdAt", "id", "updatedAt" FROM "Staining";
DROP TABLE "Staining";
ALTER TABLE "new_Staining" RENAME TO "Staining";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
