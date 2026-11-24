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
      firstName: "Jan",
      lastName: "Kowalski",
      role: "ADMIN",
      roomNumber: "Administracja 01",
    },
  });

  const resident = await prisma.user.upsert({
    where: { email: "ola.nowak@dormtech.pl" },
    update: {},
    create: {
      email: "ola.nowak@dormtech.pl",
      passwordHash: residentPasswordHash,
      firstName: "Aleksandra",
      lastName: "Nowak",
      role: "RESIDENT",
      roomNumber: "214",
    },
  });

  // 2. Przykładowe lokalizacje w akademiku
  const locRoom214 = await prisma.location.upsert({
    where: {
      building_floor_roomOrArea: {
        building: "DS Alfa",
        floor: 2,
        roomOrArea: "Pokój 214",
      },
    },
    update: {},
    create: {
      building: "DS Alfa",
      floor: 2,
      roomOrArea: "Pokój 214",
      description: "Pokój dwuosobowy z łazienką",
    },
  });

  const locKitchen2 = await prisma.location.upsert({
    where: {
      building_floor_roomOrArea: {
        building: "DS Alfa",
        floor: 2,
        roomOrArea: "Kuchnia wspólna 2P",
      },
    },
    update: {},
    create: {
      building: "DS Alfa",
      floor: 2,
      roomOrArea: "Kuchnia wspólna 2P",
      description: "Kuchnia ogólna na 2. piętrze",
    },
  });

  // 3. Przykładowe zgłoszenia usterek + historia statusów
  const existingTickets = await prisma.ticket.count();

  if (existingTickets === 0) {
    const ticket1 = await prisma.ticket.create({
      data: {
        title: "Cieknący kran w łazience",
        description: "Z baterii umywalkowej cały czas kapie zimna woda nawet po mocnym dokręceniu.",
        category: "PLUMBING",
        status: "IN_PROGRESS",
        priority: "HIGH",
        reporterId: resident.id,
        assigneeId: admin.id,
        locationId: locRoom214.id,
      },
    });

    await prisma.ticketStatusHistory.createMany({
      data: [
        {
          ticketId: ticket1.id,
          oldStatus: null,
          newStatus: "NEW",
          comment: "Utworzono zgłoszenie przez mieszkańca.",
          changedById: resident.id,
        },
        {
          ticketId: ticket1.id,
          oldStatus: "NEW",
          newStatus: "IN_PROGRESS",
          comment: "Zgłoszenie przyjęte, konserwator zamówił nową głowicę.",
          changedById: admin.id,
        },
      ],
    });

    const ticket2 = await prisma.ticket.create({
      data: {
        title: "Brak połączenia z gniazdkiem Ethernet",
        description: "Gniazdko sieciowe przy biurku nie wykrywa kabla po restarcie routera.",
        category: "INTERNET",
        status: "NEW",
        priority: "MEDIUM",
        reporterId: resident.id,
        locationId: locRoom214.id,
      },
    });

    await prisma.ticketStatusHistory.create({
      data: {
        ticketId: ticket2.id,
        oldStatus: null,
        newStatus: "NEW",
        comment: "Utworzono zgłoszenie.",
        changedById: resident.id,
      },
    });

    const ticket3 = await prisma.ticket.create({
      data: {
        title: "Przepalona świetlówka nad zlewem",
        description: "Lampa nad blatem w kuchni miga i nie zapala się w pełni.",
        category: "ELECTRICAL",
        status: "RESOLVED",
        priority: "LOW",
        reporterId: resident.id,
        assigneeId: admin.id,
        locationId: locKitchen2.id,
      },
    });

    await prisma.ticketStatusHistory.createMany({
      data: [
        {
          ticketId: ticket3.id,
          oldStatus: null,
          newStatus: "NEW",
          comment: "Utworzono zgłoszenie.",
          changedById: resident.id,
        },
        {
          ticketId: ticket3.id,
          oldStatus: "NEW",
          newStatus: "RESOLVED",
          comment: "Wymieniono świetlówkę LED na nową.",
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
  .catch((e) => {
    console.error("Błąd podczas wykonywania seeda:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });