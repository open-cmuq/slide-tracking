/*
  Warnings:

  - Made the column `title` on table `Slide` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "boxNumber" INTEGER,
    "boxPosition" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "experimentId" TEXT NOT NULL,
    "comments" TEXT,
    "observedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Slide_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Slide_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Slide" ("boxNumber", "boxPosition", "comments", "createdAt", "createdByUserId", "experimentId", "id", "observedOn", "title", "updatedAt") SELECT "boxNumber", "boxPosition", "comments", "createdAt", "createdByUserId", "experimentId", "id", "observedOn", "title", "updatedAt" FROM "Slide";
DROP TABLE "Slide";
ALTER TABLE "new_Slide" RENAME TO "Slide";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
