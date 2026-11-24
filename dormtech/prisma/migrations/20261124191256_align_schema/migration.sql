/*
  Warnings:

  - The values [hydraulika,elektryka,ogrzewanie,meble_wyposazenie,internet,inne] on the enum `TicketCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [niski,sredni,wysoki,krytyczny] on the enum `TicketPriority` will be removed. If these variants are still used in the database, this will fail.
  - The values [nowe,w_trakcie,oczekuje,rozwiazane,odrzucone] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `common_area` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `locations` table. All the data in the column will be lost.
  - The primary key for the `ticket_status_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[building,floor,room_or_area]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_or_area` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RESIDENT', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "TicketCategory_new" AS ENUM ('PLUMBING', 'ELECTRICAL', 'INTERNET', 'FURNITURE', 'CLEANING', 'OTHER');
ALTER TABLE "tickets" ALTER COLUMN "category" TYPE "TicketCategory_new" USING ("category"::text::"TicketCategory_new");
ALTER TYPE "TicketCategory" RENAME TO "TicketCategory_old";
ALTER TYPE "TicketCategory_new" RENAME TO "TicketCategory";
DROP TYPE "public"."TicketCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TicketPriority_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
ALTER TABLE "public"."tickets" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "tickets" ALTER COLUMN "priority" TYPE "TicketPriority_new" USING ("priority"::text::"TicketPriority_new");
ALTER TYPE "TicketPriority" RENAME TO "TicketPriority_old";
ALTER TYPE "TicketPriority_new" RENAME TO "TicketPriority";
DROP TYPE "public"."TicketPriority_old";
ALTER TABLE "tickets" ALTER COLUMN "priority" SET DEFAULT 'MEDIUM';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
ALTER TABLE "public"."tickets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tickets" ALTER COLUMN "status" TYPE "TicketStatus_new" USING ("status"::text::"TicketStatus_new");
ALTER TABLE "ticket_status_history" ALTER COLUMN "old_status" TYPE "TicketStatus_new" USING ("old_status"::text::"TicketStatus_new");
ALTER TABLE "ticket_status_history" ALTER COLUMN "new_status" TYPE "TicketStatus_new" USING ("new_status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "public"."TicketStatus_old";
ALTER TABLE "tickets" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- DropForeignKey
ALTER TABLE "ticket_status_history" DROP CONSTRAINT "ticket_status_history_changed_by_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket_status_history" DROP CONSTRAINT "ticket_status_history_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_location_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_reporter_id_fkey";

-- DropIndex
DROP INDEX "locations_building_floor_room_number_common_area_key";

-- DropIndex
DROP INDEX "tickets_status_category_idx";

-- AlterTable
ALTER TABLE "locations" DROP CONSTRAINT "locations_pkey",
DROP COLUMN "common_area",
DROP COLUMN "room_number",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "room_or_area" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ticket_status_history" DROP CONSTRAINT "ticket_status_history_pkey",
ADD COLUMN     "comment" TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ticket_id" SET DATA TYPE TEXT,
ALTER COLUMN "changed_by_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ticket_status_history_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
ADD COLUMN     "assignee_id" TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "category" SET DEFAULT 'OTHER',
ALTER COLUMN "status" SET DEFAULT 'NEW',
ALTER COLUMN "priority" SET DEFAULT 'MEDIUM',
ALTER COLUMN "reporter_id" SET DATA TYPE TEXT,
ALTER COLUMN "location_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "full_name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "room_number" TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'RESIDENT',
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "LocationType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "locations_building_floor_room_or_area_key" ON "locations"("building", "floor", "room_or_area");

-- CreateIndex
CREATE INDEX "tickets_status_idx" ON "tickets"("status");

-- CreateIndex
CREATE INDEX "tickets_location_id_idx" ON "tickets"("location_id");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_status_history" ADD CONSTRAINT "ticket_status_history_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_status_history" ADD CONSTRAINT "ticket_status_history_changed_by_id_fkey" FOREIGN KEY ("changed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
