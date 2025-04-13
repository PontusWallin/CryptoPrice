-- CreateTable
CREATE TABLE "CryptoTicker" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "pair" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoTicker_pkey" PRIMARY KEY ("id")
);
