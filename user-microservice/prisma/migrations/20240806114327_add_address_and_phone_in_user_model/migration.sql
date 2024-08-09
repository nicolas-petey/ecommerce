-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "idAddress" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idUser" UUID NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("idAddress")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_idUser_key" ON "Address"("idUser");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
