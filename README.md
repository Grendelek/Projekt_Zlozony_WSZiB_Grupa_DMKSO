# DormTech – panel zgłoszeń usterek w akademiku

Projekt zaliczeniowy „Projekt Złożony”, zespół DMKSO.

## Zespół DMKSO

- Igor Drożdż — [xSm3w](https://github.com/xSm3w)
- Piotr Majer — [Piotrekxm](https://github.com/Piotrekxm)
- Kacper Kania — [Grendelek](https://github.com/Grendelek)
- Krzysztof Szarek — [krizdow](https://github.com/krizdow)
- Tomasz Owca — [owcatomasz-max](https://github.com/owcatomasz-max)

Aktualny podział ról i postęp prac są dokumentowane w Trello.

## Skład repozytorium

- `dormtech/` - aplikacja Next.js: strona startowa, logowanie Auth.js, panel, endpoint `/api/health`
- `docs/` - dokumentacja projektu, kryteria akceptacji, Definition of Done
- `docker-compose.yml` - baza PostgreSQL 16 i opcjonalnie cała aplikacja w kontenerze
- `.env.example` - przykładowe zmienne, prawdziwy `.env` trzymamy poza Git

## Dokumentacja

- Dokumentacja projektu jest w folderze `docs/`
- Definition of Done: `docs/Definition_of_Done.md`
- Aktualny podział ról i postęp prac są w Trello


## Lokalne uruchomienie w PowerShell (Docker tylko dla PostgreSQL)

Wymagania: Node.js 20.20.0 (LTS), Docker Desktop, PowerShell. Polecenia zaczynają się w katalogu głównym repozytorium.

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
# Zmień POSTGRES_PASSWORD i DATABASE_URL w .env, ustaw własny AUTH_SECRET.
# PORT: jeśli w .env ustawiasz POSTGRES_PORT=55432, w DATABASE_URL użyj localhost:55432.
if (!(Test-Path dormtech/.env)) { Copy-Item .env dormtech/.env }
# Upewnij się, że DATABASE_URL w dormtech/.env używa portu dostępnego na komputerze.
docker compose up -d db
cd dormtech
npm.cmd ci
npm.cmd run db:generate
npm.cmd run db:migrate:deploy
npm.cmd run db:seed
npm.cmd run dev
```

Otwórz http://localhost:3000. Po wdrożeniu Auth.js stroną logowania będzie `/login`. Do sprawdzenia statusu bazy: `docker compose ps` w katalogu głównym.

**Uwaga:** korekta struktury jest zapisana w migracji `20261124191256_align_schema`. Zwykle należy zastosować istniejące migracje przez `npm.cmd run db:migrate:deploy`, a nie generować je ponownie. Druga migracja może zakończyć się błędem lub spowodować utratę danych na starszej, niepustej bazie — przed jej uruchomieniem skonsultuj się z zespołem. Nie wykonuj `docker compose down -v` ani `prisma migrate reset` na bazie zawierającej ważne dane.

## Docker Compose – cała aplikacja

W katalogu głównym po ustawieniu `.env`:

```powershell
docker compose up -d --build
# Po scaleniu migracji 20261124191256_align_schema do używanej gałęzi:
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
