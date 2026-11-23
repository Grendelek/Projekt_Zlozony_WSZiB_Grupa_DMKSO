-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('mieszkaniec', 'admin');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('pokoj', 'czesc_wspolna');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('hydraulika', 'elektryka', 'ogrzewanie', 'meble_wyposazenie', 'internet', 'inne');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('nowe', 'w_trakcie', 'oczekuje', 'rozwiazane', 'odrzucone');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('niski', 'sredni', 'wysoki', 'krytyczny');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'mieszkaniec',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" UUID NOT NULL,
    "building" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "room_number" TEXT,
    "common_area" TEXT,
    "type" "LocationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TicketCategory" NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'nowe',
    "priority" "TicketPriority" NOT NULL DEFAULT 'sredni',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reporter_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_status_history" (
    "id" UUID NOT NULL,
    "old_status" "TicketStatus",
    "new_status" "TicketStatus" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_id" UUID NOT NULL,
    "changed_by_id" UUID NOT NULL,

    CONSTRAINT "ticket_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "locations_building_floor_room_number_common_area_key" ON "locations"("building", "floor", "room_number", "common_area");

-- CreateIndex
CREATE INDEX "tickets_status_category_idx" ON "tickets"("status", "category");

-- CreateIndex
CREATE INDEX "tickets_reporter_id_idx" ON "tickets"("reporter_id");

-- CreateIndex
CREATE INDEX "ticket_status_history_ticket_id_idx" ON "ticket_status_history"("ticket_id");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_status_history" ADD CONSTRAINT "ticket_status_history_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_status_history" ADD CONSTRAINT "ticket_status_history_changed_by_id_fkey" FOREIGN KEY ("changed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
