/*
  Warnings:

  - You are about to drop the column `direccion` on the `alumnos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alumnos" DROP COLUMN "direccion",
ADD COLUMN     "transporteAsignado" TEXT,
ALTER COLUMN "telefono" DROP NOT NULL;
