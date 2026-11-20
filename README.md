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


## Baza danych (Docker)

Wymagany Docker Desktop.

```
cp .env.example .env
docker compose up -d db
```

Sprawdzenie: `docker compose ps` (status `healthy`).
Zatrzymanie: `docker compose down` – dane zostają w wolumenie `dbdata`.
Usunięcie danych: `docker compose down -v`.
