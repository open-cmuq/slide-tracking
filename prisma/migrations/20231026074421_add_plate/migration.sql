-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coverslip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shape" TEXT NOT NULL,
    "coating" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" TEXT NOT NULL,
    "positionX" REAL,
    "positionY" REAL,
    "slideId" TEXT NOT NULL,
    "specimen" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "plateIdx" INTEGER DEFAULT -1,
    CONSTRAINT "Coverslip_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Coverslip_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "Slide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Coverslip" ("coating", "createdAt", "createdByUserId", "id", "positionX", "positionY", "shape", "slideId", "specimen", "updatedAt") SELECT "coating", "createdAt", "createdByUserId", "id", "positionX", "positionY", "shape", "slideId", "specimen", "updatedAt" FROM "Coverslip";
DROP TABLE "Coverslip";
ALTER TABLE "new_Coverslip" RENAME TO "Coverslip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
