/*
  Warnings:

  - You are about to drop the `Calculo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calculo" DROP CONSTRAINT "Calculo_userId_fkey";

-- DropTable
DROP TABLE "Calculo";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipoProfissao" TEXT NOT NULL,
    "faturamento" DOUBLE PRECISION NOT NULL,
    "impostoPF" DOUBLE PRECISION NOT NULL,
    "impostoPJ" DOUBLE PRECISION NOT NULL,
    "melhorOpcao" TEXT NOT NULL,
    "economiaMensal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calculos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "calculos" ADD CONSTRAINT "calculos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
