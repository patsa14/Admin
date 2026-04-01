/*
  Warnings:

  - You are about to drop the column `property` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "property",
DROP COLUMN "status";
