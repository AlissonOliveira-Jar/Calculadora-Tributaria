-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tipoProfissao" TEXT NOT NULL,
    "faturamento" DOUBLE PRECISION NOT NULL,
    "impostoPF" DOUBLE PRECISION NOT NULL,
    "impostoPJ" DOUBLE PRECISION NOT NULL,
    "melhorOpcao" TEXT NOT NULL,
    "economiaMensal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Calculo" ADD CONSTRAINT "Calculo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
