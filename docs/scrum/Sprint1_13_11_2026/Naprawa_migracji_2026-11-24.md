# Korekta migracji Prisma i przywrócenie Next.js (24.11.2026)

W PR #8 nieumyślnie usunięto pliki `dormtech/src/app/` – przywrócono je osobno z wcześniejszego commita.

Wcześniejszy `migration.sql` nie odpowiadał `schema.prisma` (enumy PL/EN, UUID/CUID, inne kolumny). **Nie modyfikujemy już opublikowanego `20261123114415_init/migration.sql`.** Na odrębnej testowej bazie należy wygenerować **nową migrację przyrostową** komendą `npx prisma migrate dev --name align_schema`, przejrzeć wygenerowany SQL i zatwierdzić nowy katalog migracji w Pull Request.

**Uwaga o historii migracji:** Zmiana już zastosowanej migracji Prisma zmienia jej sumę kontrolną. Nie należy stosować takiej korekty do współdzielonej/produkcyjnej bazy z danymi. Najpierw ustalcie, czy pierwsza migracja była gdziekolwiek zastosowana; dla istniejących danych przygotujcie osobną migrację przyrostową z zachowaniem danych.

Na potrzeby Sprintu 1 weryfikować poprawność na **nowym, osobnym wolumenie testowym** i wykonać `prisma migrate dev --name align_schema`, `prisma generate`, `prisma db seed`. Po dodaniu wygenerowanej migracji do Git na innych środowiskach uruchamiać `prisma migrate deploy`. Po uruchomieniu sprawdzić oba konta i trzy zgłoszenia.

Pliki źródłowe aplikacji i korekta bazy powinny przejść osobny przegląd Pull Request zgodnie z DoD.
