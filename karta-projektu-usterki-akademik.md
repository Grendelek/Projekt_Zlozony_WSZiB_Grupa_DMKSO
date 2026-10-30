# Karta projektu – Panel zgłoszeń usterek w akademiku

**Nazwa robocza:** Nazwa / UsterkiAkademik  
**Temat:** Aplikacja webowa do zgłaszania i obsługi usterek w konkretnym akademiku studenckim.  
**Prosimy o akceptację tematu i zakresu MVP w Sprincie 0.**

## 1. Problem

W akademiku usterki (prysznic, grzejnik, zamek, internet w pokoju, oświetlenie korytarza) zgłasza się zwykle mailem, na kartce u portiera albo na grupie Messenger. Skutek:

- zgłoszenia giną lub są duplikowane,
- mieszkaniec nie wie, na jakim etapie jest sprawa,
- administracja nie ma wspólnej kolejki priorytetów,
- trudno policzyć, które pokoje / piętra generują najwięcej awarii.

## 2. Użytkownicy

| Rola w aplikacji | Kto to jest | Co może |
|------------------|-------------|---------|
| **Mieszkaniec** | Student z pokojem w akademiku | Zakłada zgłoszenie, śledzi status, uzupełnia opis / zdjęcie (opcjonalnie w S/C) |
| **Administracja / technik** | Portier, admin domu, konserwator | Widzi kolejkę, zmienia status, przypisuje priorytet, zamyka zgłoszenie |

*(Wymaganie W4: min. 2 role z różnymi uprawnieniami.)*

## 3. Wizja produktu

Do końca semestru dostarczamy działającą aplikację webową, w której mieszkaniec w kilka minut zgłasza usterkę powiązaną z lokalizacją (pokój / piętro / część wspólna), a administracja prowadzi je w jednym panelu od „nowe” do „rozwiązane” — z historią w bazie i kontami testowymi do demonstracji.

## 4. Zespół i role Scrum *(uzupełnić imionami)*

| Rola Scrum | Osoba |
|------------|--------|
| Product Owner | … |
| Scrum Master | … |
| Interesariusz / klient (symulacja) | … |
| Developers | Krzysztof Szarek , … *(PO i SM też programują)* |

Narzędzie Scrum: Trello  
Repozytorium: https://github.com/Grendelek/Projekt_Zlozony_WSZiB_Grupa_DMKSO.git

## 5. MVP — Must have (cel: koniec Sprintu 3)

1. Rejestracja / logowanie; role **mieszkaniec** i **administracja**.
2. Zarządzanie lokalizacjami (budynek/akademik → piętro → pokój / strefa wspólna) — min. dane seed.
3. Zgłoszenie usterki: tytuł, opis, kategoria (np. hydraulika, elektryka, stolarska, inne), lokalizacja, priorytet wstępny.
4. Pełne **CRUD** zgłoszeń (mieszkaniec: swoje; administracja: wszystkie) + zmiana statusu: `nowe` → `w trakcie` → `rozwiązane` / `odrzucone`.
5. Lista i filtrowanie zgłoszeń (status, kategoria) + walidacja formularzy i czytelne błędy.
6. Dane w bazie (≥ 3 powiązane encje), uruchomienie wg README / Docker, hasła hashowane.

## 6. Should / Could / Won’t (skrót)

**Should (po MVP, jeśli starczy czasu):** komentarze przy zgłoszeniu, przypisanie technika, powiadomienie e-mail o zmianie statusu, załącznik zdjęcia.

**Could:** dashboard statystyk (ile otwartych / średni czas zamknięcia), eksport CSV, ciemny motyw.

**Won’t have this time (świadomie poza zakresem):**

1. Aplikacja mobilna natywna  
2. Płatności / kaucje za szkody  
3. Integracja z systemem uczelni (USOS / SSO)  
4. Czat na żywo / push mobile  
5. AI do klasyfikacji usterek  

## 7. Stos technologiczny (propozycja)

- **Frontend + API:** Next.js (TypeScript)  
- **Baza:** PostgreSQL  
- **Auth:** sesje / JWT + role w bazie  
- **Uruchomienie:** Docker Compose (app + DB)  
- **CI:** GitHub Actions (build + testy)  
- **Demo online (opcjonalnie):** Railway / Render — nie wymagane do W9  

Uzasadnienie szczegółowe trafi do dokumentu architektury (ADR) w Sprincie 1.

## 8. Mapowanie na W1–W10 (checklista)

| Nr | Jak spełnimy |
|----|----------------|
| W1 | ≥ 3 UC: zgłoszenie usterki, obsługa statusów przez admina, przegląd/filtrowanie listy |
| W2 | Encje: User, Location, Ticket (+ opcjonalnie Category / Comment) |
| W3 | CRUD na Ticket |
| W4 | Role mieszkaniec vs administracja |
| W5 | UI web + walidacja |
| W6 | Warstwy: UI / logika / dane |
| W7 | Testy jednostkowe logiki statusów + 1 test integracyjny API/DB |
| W8 | Git, PR, review |
| W9 | `docker compose up` + README |
| W10 | `.env`, bcrypt/argon2 na hasła |
