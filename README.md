# DormTech – panel zgłoszeń usterek w akademiku

Projekt zaliczeniowy „Projekt Złożony”, zespół DMKSO.

## Lokalne uruchomienie w PowerShell (Docker tylko dla PostgreSQL)

Wymagania: Node.js 22, Docker Desktop, PowerShell. Polecenia zaczynają się w katalogu głównym repozytorium.

```powershell
Copy-Item .env.example .env
# Zmień POSTGRES_PASSWORD i DATABASE_URL w .env, ustaw własny AUTH_SECRET.
Copy-Item .env dormtech/.env
# Jeżeli lokalny PostgreSQL używa innego portu, zmień też DATABASE_URL.
docker compose up -d db
cd dormtech
npm.cmd ci
npm.cmd run db:generate
npx prisma migrate dev --name align_schema
npm.cmd run db:seed
npm.cmd run dev
```

Otwórz http://localhost:3000/login po wdrożeniu Auth.js. Do sprawdzenia statusu DB: `docker compose ps` w katalogu głównym.

**Uwaga:** stary `migration.sql` różni się od modelu Prisma. Nie nadpisuj go: wygeneruj nową migrację przyrostową i dołącz ją do PR. Jeśli wygenerowano ją już na innej gałęzi, zastosuj `prisma migrate deploy` zamiast ponownego generowania. Nie wykonuj `docker compose down -v` ani `prisma migrate reset` na bazie z ważnymi danymi.

## Docker Compose – cała aplikacja

W katalogu głównym po ustawieniu `.env`:

```powershell
docker compose up -d --build
# Wykonuj dopiero po dodaniu poprawionej migracji przyrostowej do repo:
docker compose exec app npx prisma migrate deploy
docker compose exec app npx prisma db seed
```

W kontenerze aplikacji `DATABASE_URL` wskazuje na hostname `db`, a przy uruchamianiu poleceń Prisma na Windowsie – na `localhost`.

## Testowe konta (wyłącznie środowisko demonstracyjne)

- Administrator: `admin@dormtech.pl`, hasło `Admin123!`
- Mieszkaniec: `ola.nowak@dormtech.pl`, hasło `Mieszkaniec123!`

Hasła są zapisywane w bazie jako skróty bcrypt. Nie używaj tych danych w produkcji.

## Test jakości

W `dormtech/`: `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit` (wymaga sieci). Sam build nie dowodzi poprawności migracji.
