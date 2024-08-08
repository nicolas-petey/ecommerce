-- CreateTable
CREATE TABLE "Order" (
    "idOrder" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idUser" TEXT NOT NULL,
    "dateOrder" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalOrder" DOUBLE PRECISION NOT NULL,
    "statusOrder" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("idOrder")
);

-- CreateTable
CREATE TABLE "ProductOnOrder" (
    "idOrder" UUID NOT NULL,
    "idProduct" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductOnOrder_pkey" PRIMARY KEY ("idOrder","idProduct")
);

-- AddForeignKey
ALTER TABLE "ProductOnOrder" ADD CONSTRAINT "ProductOnOrder_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE;
