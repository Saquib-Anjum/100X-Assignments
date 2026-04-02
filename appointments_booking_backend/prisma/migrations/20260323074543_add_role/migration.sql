-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SERVICE_PROVIDER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
