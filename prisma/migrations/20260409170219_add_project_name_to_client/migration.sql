/*
  Warnings:

  - You are about to drop the column `progress` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "progress",
ADD COLUMN     "projectName" TEXT NOT NULL DEFAULT 'No Project';
