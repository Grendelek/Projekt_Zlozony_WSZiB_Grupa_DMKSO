# Definition of Done (DoD)
**Projekt:** DormTech – Panel zgłoszeń usterek w akademiku  
**Zespół:** DMKSO  
**Wersja:** 1.0  
**Obowiązuje od:** Sprint 0

## 1. Cel

Definition of Done określa wspólne warunki uznania zadania lub historyjki użytkownika za ukończone.

Zadanie może zostać przeniesione do kolumny **Done** na tablicy Trello dopiero po spełnieniu wszystkich dotyczących go warunków.

## 2. Kryteria ukończenia zadania

- [ ] **Realizacja wymagania** – funkcjonalność została zaimplementowana zgodnie z opisem zadania i jego kryteriami akceptacji.
- [ ] **Poprawne działanie** – funkcjonalność została sprawdzona i działa zgodnie z oczekiwaniami, bez znanych błędów uniemożliwiających korzystanie z niej.
- [ ] **Testy** – napisano lub zaktualizowano odpowiednie testy dla nowej logiki biznesowej, a wszystkie wymagane testy przechodzą.
- [ ] **Przegląd zmian (Code Review)** – zmiany zostały umieszczone w Pull Requeście i sprawdzone oraz zaakceptowane przez przynajmniej jednego innego członka zespołu.
- [ ] **Integracja** – zmiany zostały połączone z główną gałęzią repozytorium, a proces CI (budowanie i testowanie aplikacji) zakończył się pomyślnie.
- [ ] **Dokumentacja** – zaktualizowano README, dokumentację techniczną lub diagramy, jeśli wprowadzone zmiany tego wymagają.
- [ ] **Akceptacja Product Ownera** – funkcjonalność została przedstawiona i zaakceptowana przez Product Ownera.
- [ ] **Aktualizacja Trello** – karta zawiera informacje o wykonanej pracy, osobie odpowiedzialnej oraz odnośnik do odpowiedniego Pull Requesta lub commita.

## 3. Dodatkowe kryteria dla funkcjonalności DormTech

Jeżeli zadanie dotyczy danego obszaru aplikacji, dodatkowo sprawdzamy:

- [ ] **Uprawnienia** – mieszkaniec ma dostęp wyłącznie do dozwolonych operacji i własnych zgłoszeń, a administracja do funkcji zarządzania.
- [ ] **Walidacja** – formularze odrzucają niepoprawne dane i wyświetlają zrozumiałe komunikaty.
- [ ] **Baza danych** – dane są prawidłowo zapisywane, odczytywane i pozostają dostępne po ponownym uruchomieniu aplikacji.
- [ ] **Bezpieczeństwo** – hasła są przechowywane jako hashe, a repozytorium nie zawiera haseł, tokenów ani innych sekretów.
- [ ] **Interfejs** – funkcjonalność jest dostępna w aplikacji webowej i umożliwia wykonanie przewidzianych operacji.

## 4. Zasady dotyczące wykorzystania AI

- Możliwe jest generowanie kodu, dokumentacji i testów przy pomocy narzędzi AI.
- Osoba realizująca zadanie powinna rozumieć jego działanie i potrafić wyjaśnić zastosowane rozwiązanie.
- Kod wygenerowany przez AI podlega takim samym kryteriom ukończenia jak kod napisany samodzielnie.
- Wykorzystane narzędzia AI zostaną opisane w raporcie końcowym.

## 5. Zasady zamykania zadań

1. Developer kończy realizację zadania i sprawdza jego działanie.
2. Tworzy Pull Request i wskazuje powiązaną kartę Trello.
3. Inny członek zespołu sprawdza i akceptuje zmiany.
4. Po pomyślnym przejściu testów i CI zmiany zostają połączone z gałęzią główną.
5. Product Owner akceptuje wykonane wymaganie.
6. Karta zostaje przeniesiona do kolumny **Done**.

Jeżeli którekolwiek wymagane kryterium nie jest spełnione, zadanie pozostaje w trakcie realizacji lub wraca do poprawy.

## 6. Zatwierdzenie

Definition of Done została przyjęta przez zespół projektowy DormTech i obowiązuje podczas wszystkich sprintów. Ewentualne zmiany DoD będą dokumentowane w Trello.