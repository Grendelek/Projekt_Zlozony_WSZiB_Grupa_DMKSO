# Projekt_Zlozony_WSZiB_Grupa_DMKSO

Projekt zaliczeniowy z zajęć Projekt Złożony
Temat projektu: Aplikacja webowa do zgłaszania i obsługi usterek w akademiku studenckim

Skład:
Igor Drożdż - xSm3w \
Piotr Majer - Piotrekxm \
Kacper Kania - Grendelek \
Krzysztof Szarek - krizdow \
Tomasz Owca - owcatomasz-max \
(Adnotacje dotyczące aktualnego stanu ról będą adnotowane w Trello)

## Uruchomienie (Docker)

Wymagany Docker Desktop.

```
cp .env.example .env
docker compose up --build
```

Aplikacja: http://localhost:3000

Sama baza (np. do pracy z `npm run dev`): `docker compose up -d db`
Sprawdzenie: `docker compose ps` (baza ze statusem `healthy`).
Zatrzymanie: `docker compose down` - dane zostają w wolumenie `dbdata`.
Usunięcie danych: `docker compose down -v`.

## Baza danych i konta testowe (Prisma)

1. Skopiuj plik środowiskowy:
   ```bash
   cp .env.example .env
   ```

docker compose up -d

cd dormtech
npm run db:migrate:deploy
npm run db:seed

Konta testowe  
Rola E-mail Hasło
Administrator admin@dormtech.pl Admin123!
Mieszkaniec ola.nowak@dormtech.pl Mieszkaniec123!
