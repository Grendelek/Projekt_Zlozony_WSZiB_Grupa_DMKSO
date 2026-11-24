# Auth.js — plan testów Sprint 1

Auth.js v5: Credentials e-mail/hasło, `bcryptjs`, sesja JWT z ID i rolą.

1. `npm install next-auth@beta` w `dormtech/` i zapisz wygenerowany `package-lock.json`.
2. Ustaw losowy `AUTH_SECRET` w lokalnym `dormtech/.env`; uruchom bazę, migrację i seed.
3. `npm run dev`, otwórz `/login`.
4. Administrator (`admin@dormtech.pl` / `Admin123!`) trafia na `/dashboard` z rolą administratora.
5. Mieszkaniec (`ola.nowak@dormtech.pl` / `Mieszkaniec123!`) trafia na `/dashboard` z rolą mieszkańca.
6. Złe hasło daje ogólny komunikat, nie tworzy sesji.
7. Niezalogowane `/dashboard` przekierowuje na `/login`.
8. Wylogowanie unieważnia sesję; ponowne wejście na `/dashboard` przekierowuje na `/login`.
9. `npm run lint` oraz `npm run build` bez błędów.

Ten pakiet nie implementuje jeszcze rejestracji ani serwerowej autoryzacji operacji na zgłoszeniach. Nie umieszczaj danych dostępowych z seeda w produkcji. Ochronę zasobów wdrażaj także w endpointach i akcjach serwera, nigdy tylko przez ukrywanie przycisków.
