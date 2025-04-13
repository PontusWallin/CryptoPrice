/*
  Warnings:

  - You are about to drop the column `coinId` on the `CryptoTicker` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `CryptoTicker` table. All the data in the column will be lost.
  - Added the required column `source` to the `CryptoTicker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `CryptoTicker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoTicker" DROP COLUMN "coinId",
DROP COLUMN "lastUpdated",
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
