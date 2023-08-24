-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CASHIER', 'MANAGER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CASHIER';
