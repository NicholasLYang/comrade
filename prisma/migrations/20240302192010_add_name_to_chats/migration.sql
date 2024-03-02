-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "docId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Chat'
);
INSERT INTO "new_Chat" ("createdAt", "docId", "id", "updatedAt") SELECT "createdAt", "docId", "id", "updatedAt" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE UNIQUE INDEX "Chat_docId_key" ON "Chat"("docId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
