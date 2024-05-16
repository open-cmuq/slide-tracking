-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("id", "provider", "providerAccountId", "userId") SELECT "id", "provider", "providerAccountId", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expires" DATETIME NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("expires", "id", "sessionToken", "userId") SELECT "expires", "id", "sessionToken", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE TABLE "new_Staining" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coverslipId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Staining_coverslipId_fkey" FOREIGN KEY ("coverslipId") REFERENCES "Coverslip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Staining_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Staining" ("coverslipId", "createdAt", "id", "updatedAt", "userId") SELECT "coverslipId", "createdAt", "id", "updatedAt", "userId" FROM "Staining";
DROP TABLE "Staining";
ALTER TABLE "new_Staining" RENAME TO "Staining";
CREATE TABLE "new_StainingField" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "stainingId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "StainingField_stainingId_fkey" FOREIGN KEY ("stainingId") REFERENCES "Staining" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StainingField_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StainingField" ("createdAt", "id", "name", "stainingId", "updatedAt", "userId", "value") SELECT "createdAt", "id", "name", "stainingId", "updatedAt", "userId", "value" FROM "StainingField";
DROP TABLE "StainingField";
ALTER TABLE "new_StainingField" RENAME TO "StainingField";
CREATE TABLE "new_CoverslipFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coverslipId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "CoverslipFile_coverslipId_fkey" FOREIGN KEY ("coverslipId") REFERENCES "Coverslip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CoverslipFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CoverslipFile" ("coverslipId", "createdAt", "id", "name", "size", "updatedAt", "userId") SELECT "coverslipId", "createdAt", "id", "name", "size", "updatedAt", "userId" FROM "CoverslipFile";
DROP TABLE "CoverslipFile";
ALTER TABLE "new_CoverslipFile" RENAME TO "CoverslipFile";
CREATE TABLE "new_Experiment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Experiment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Experiment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Experiment" ("createdAt", "id", "projectId", "title", "updatedAt", "userId") SELECT "createdAt", "id", "projectId", "title", "updatedAt", "userId" FROM "Experiment";
DROP TABLE "Experiment";
ALTER TABLE "new_Experiment" RENAME TO "Experiment";
CREATE TABLE "new_Coverslip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shape" TEXT NOT NULL,
    "coating" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "positionX" TEXT NOT NULL,
    "positionY" TEXT NOT NULL,
    "slideId" TEXT NOT NULL,
    "specimen" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Coverslip_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "Slide" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Coverslip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Coverslip" ("coating", "createdAt", "id", "positionX", "positionY", "shape", "slideId", "specimen", "updatedAt", "userId") SELECT "coating", "createdAt", "id", "positionX", "positionY", "shape", "slideId", "specimen", "updatedAt", "userId" FROM "Coverslip";
DROP TABLE "Coverslip";
ALTER TABLE "new_Coverslip" RENAME TO "Coverslip";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "id", "title", "updatedAt", "userId") SELECT "createdAt", "id", "title", "updatedAt", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Slide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "boxNumber" INTEGER,
    "boxPosition" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experimentId" TEXT NOT NULL,
    "notes" TEXT,
    "observedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Slide_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Slide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Slide" ("boxNumber", "boxPosition", "createdAt", "experimentId", "id", "notes", "observedOn", "title", "updatedAt", "userId") SELECT "boxNumber", "boxPosition", "createdAt", "experimentId", "id", "notes", "observedOn", "title", "updatedAt", "userId" FROM "Slide";
DROP TABLE "Slide";
ALTER TABLE "new_Slide" RENAME TO "Slide";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
