/*
  Warnings:

  - You are about to drop the column `otrosPagos` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `pagaOtrosPagos` on the `alumnos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alumnos" DROP COLUMN "otrosPagos",
DROP COLUMN "pagaOtrosPagos",
ADD COLUMN     "clase" TEXT;

-- CreateTable
CREATE TABLE "otras_clases" (
    "id" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "frecuencia" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otras_clases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "otras_clases" ADD CONSTRAINT "otras_clases_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
