/*
  Warnings:

  - You are about to drop the column `mensualidad` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `motivoRetiro` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `representante` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `solvente` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `transporte` on the `alumnos` table. All the data in the column will be lost.
  - Added the required column `edad` to the `alumnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montoPago` to the `alumnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `alumnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPago` to the `alumnos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alumnos" DROP COLUMN "mensualidad",
DROP COLUMN "motivoRetiro",
DROP COLUMN "representante",
DROP COLUMN "solvente",
DROP COLUMN "transporte",
ADD COLUMN     "edad" INTEGER NOT NULL,
ADD COLUMN     "montoPago" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "notasInactividad" TEXT,
ADD COLUMN     "otrosPagos" DECIMAL(10,2),
ADD COLUMN     "pagaOtrosPagos" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pagaTransporte" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tipoPago" TEXT NOT NULL,
ALTER COLUMN "montoTransporte" DROP NOT NULL;

-- CreateTable
CREATE TABLE "pagos" (
    "id" TEXT NOT NULL,
    "alumnoId" TEXT NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "pagado" BOOLEAN NOT NULL DEFAULT false,
    "fechaPago" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
