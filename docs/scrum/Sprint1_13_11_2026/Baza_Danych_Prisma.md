# Raport zadania – Baza danych i Prisma (Sprint 1)

## Zakres wykonanych prac
- Skonfigurowano schemat bazy danych PostgreSQL w Prisma (dormtech/prisma/schema.prisma) z modelami: User, Location, Ticket, TicketStatusHistory.
- Wygenerowano i zastosowano początkową migrację bazodanową (init).
- Przygotowano skrypt zasilający bazę danymi startowymi (dormtech/prisma/seed.mjs) wraz z przykładowymi lokalizacjami, zgłoszeniami usterek oraz historią zmian statusów.
- Utworzono singleton klienta Prisma (dormtech/src/lib/prisma.js) oraz zaktualizowano dokumentację uruchomieniową w README.md.

## Konta testowe

| Rola | E-mail | Hasło |
| --- | --- | --- |
| **Administrator** | dmin@dormtech.pl | Admin123! |
| **Mieszkaniec** | ola.nowak@dormtech.pl | Mieszkaniec123! |
