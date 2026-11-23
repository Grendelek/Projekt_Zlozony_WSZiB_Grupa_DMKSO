import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await bcrypt.hash("Admin123!", 12);
  const residentPasswordHash = await bcrypt.hash("Mieszkaniec123!", 12);

  // 1. Konta testowe (1x admin, 1x mieszkaniec)
  const admin = await prisma.user.upsert({
    where: { email: "admin@dormtech.pl" },
    update: {},
    create: {
      email: "admin@dormtech.pl",
      passwordHash: adminPasswordHash,
      fullName: "Marek Kowalski (Administracja)",
      role: "admin",
    },
  });

  const resident = await prisma.user.upsert({
    where: { email: "ola.nowak@dormtech.pl" },
    update: {},
    create: {
      email: "ola.nowak@dormtech.pl",
      passwordHash: residentPasswordHash,
      fullName: "Ola Nowak",
      role: "mieszkaniec",
    },
  });

  // 2. Lokalizacje (pokój + część wspólna zgodnie z US-04)
  let room204 = await prisma.location.findFirst({
    where: { building: "DS-1", floor: 2, roomNumber: "204" },
  });

  if (!room204) {
    room204 = await prisma.location.create({
      data: {
        building: "DS-1",
        floor: 2,
        roomNumber: "204",
        type: "pokoj",
      },
    });
  }

  let commonKitchen = await prisma.location.findFirst({
    where: { building: "DS-1", floor: 2, commonArea: "Kuchnia wspólna 2P" },
  });

  if (!commonKitchen) {
    commonKitchen = await prisma.location.create({
      data: {
        building: "DS-1",
        floor: 2,
        commonArea: "Kuchnia wspólna 2P",
        type: "czesc_wspolna",
      },
    });
  }

  // 3. Przykładowe zgłoszenia
  const existingTicketsCount = await prisma.ticket.count();

  if (existingTicketsCount === 0) {
    const ticket1 = await prisma.ticket.create({
      data: {
        title: "Zapowietrzony grzejnik w pokoju 204",
        description:
          "Grzejnik pod oknem jest zimny mimo odkręcenia zaworu na maksimum.",
        category: "ogrzewanie",
        status: "nowe",
        priority: "wysoki",
        reporterId: resident.id,
        locationId: room204.id,
      },
    });

    await prisma.ticketStatusHistory.create({
      data: {
        ticketId: ticket1.id,
        oldStatus: null,
        newStatus: "nowe",
        changedById: resident.id,
      },
    });

    const ticket2 = await prisma.ticket.create({
      data: {
        title: "Cieknący kran w kuchni na 2. piętrze",
        description:
          "Z baterii przy zlewie kapie woda nawet po mocnym dokręceniu.",
        category: "hydraulika",
        status: "w_trakcie",
        priority: "sredni",
        reporterId: resident.id,
        locationId: commonKitchen.id,
      },
    });

    await prisma.ticketStatusHistory.createMany({
      data: [
        {
          ticketId: ticket2.id,
          oldStatus: null,
          newStatus: "nowe",
          changedById: resident.id,
        },
        {
          ticketId: ticket2.id,
          oldStatus: "nowe",
          newStatus: "w_trakcie",
          changedById: admin.id,
        },
      ],
    });
  }

  console.log("Seed zakończony pomyślnie:", {
    admin: admin.email,
    resident: resident.email,
  });
}

main()
  .catch((error) => {
    console.error("Błąd podczas wykonywania seeda:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
