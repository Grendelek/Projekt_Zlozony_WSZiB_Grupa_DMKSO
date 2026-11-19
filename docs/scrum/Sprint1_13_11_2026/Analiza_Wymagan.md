
# DormTech - analiza wymagań metodą MoSCoW

**Zespół DMKSO**

Analiza opiera się na karcie projektu DormTech.

## 1. Problem i cel

Mieszkańcy akademika zgłaszają usterki przez pocztę, komunikatory lub u portiera. Rozproszenie zgłoszeń utrudnia śledzenie spraw, sprzyja duplikatom i komplikuje ustalanie kolejności napraw.

DormTech to aplikacja webowa do zgłaszania i obsługi usterek w akademiku. Mieszkaniec zgłasza usterkę w pokoju lub części wspólnej i śledzi jej status. Administracja pracuje na wspólnej kolejce, aktualizuje statusy i ustala priorytety.

## 2. Użytkownicy i persony

| Persona | Sytuacja | Potrzeba | Przykładowy scenariusz |
| --- | --- | --- | --- |
| **Ola, mieszkanka akademika** | Wieczorem zauważa awarię grzejnika, korzysta z telefonu. | Szybko zgłosić problem i później sprawdzić postęp. | Wybiera pokój, wysyła zgłoszenie i wraca do listy swoich spraw. |
| **Marek, pracownik administracji** | Przyjmuje zgłoszenia z wielu pokoi i koordynuje ich obsługę. | Widzieć wspólną kolejkę, ustalać priorytety i aktualizować statusy. | Filtruje nowe zgłoszenia, ustala priorytet awarii i zamyka sprawę po naprawie. |

Podstawowe role aplikacji to **mieszkaniec** i **administrator**. Przypisanie technika do zgłoszenia jest funkcją Should Have.

## 3. Priorytety MoSCoW

| Kategoria | Znaczenie | Liczba historyjek |
| --- | --- | --- |
| **M - Must Have** | Wymagania konieczne do działania MVP. | 11 |
| **S - Should Have** | Ważne usprawnienia obsługi zgłoszeń, planowane po podstawowym zakresie. | 3 |
| **C - Could Have** | Funkcje realizowane w miarę dostępnego czasu. | 1 |
| **W - Won’t Have This Time** | Funkcje świadomie odłożone poza to wydanie. | 3 |

Podział 60/20/20 dotyczy orientacyjnego **nakładu pracy** w kategoriach M/S/C.

## 4. Wymagania funkcjonalne

### Must Have

| ID | Tytuł w Trello | Historyjka użytkownika | Uzasadnienie |
| --- | --- | --- | --- |
| **US-01** | Rejestracja i logowanie użytkowników | Jako mieszkaniec chcę założyć konto i się zalogować, aby móc składać i śledzić zgłoszenia. | Konto wiąże zgłoszenia z użytkownikiem i umożliwia kontrolę dostępu. |
| **US-02** | Przypisywanie ról i uprawnień użytkownikom | Jako administrator chcę nadawać użytkownikom odpowiednie role, aby mieli dostęp do właściwych funkcji. | Zgłaszanie usterek i zarządzanie kolejką wymagają odrębnych uprawnień. |
| **US-03** | Tworzenie zgłoszenia usterki | Jako mieszkaniec chcę zgłosić usterkę, aby administracja mogła się nią zająć. | Tworzenie zgłoszenia realizuje główny cel DormTech. |
| **US-04** | Wskazywanie lokalizacji usterki | Jako mieszkaniec chcę wybrać pokój lub część wspólną, aby wskazać miejsce naprawy. | Jednoznaczna lokalizacja pozwala odnaleźć usterkę. |
| **US-05** | Przeglądanie własnych zgłoszeń i ich statusów | Jako mieszkaniec chcę przeglądać swoje zgłoszenia i ich statusy, aby śledzić postęp naprawy. | Widoczny status ogranicza ponawianie zgłoszeń i pytania o postęp. |
| **US-06** | Edycja i usuwanie własnych zgłoszeń | Jako mieszkaniec chcę edytować lub usunąć własne zgłoszenie, aby poprawić pomyłkę albo wycofać duplikat. | Mieszkaniec musi mieć możliwość skorygowania własnego zgłoszenia. |
| **US-07** | Przeglądanie wszystkich zgłoszeń przez administratora | Jako administrator chcę widzieć wszystkie zgłoszenia i ich szczegóły, aby obsługiwać je z jednej kolejki. | Wspólna kolejka zastępuje rozproszone kanały przyjmowania usterek. |
| **US-08** | Zmiana statusu zgłoszenia | Jako administrator chcę zmienić status zgłoszenia, aby odnotować postęp i zamknięcie sprawy. | Aktualizacja statusu pozwala śledzić przebieg obsługi. |
| **US-09** | Ustalanie priorytetu zgłoszenia | Jako administrator chcę ustalić priorytet zgłoszenia, aby najpilniejsze usterki były widoczne w kolejce. | Priorytet pomaga ustalić kolejność obsługi. |
| **US-10** | Filtrowanie zgłoszeń według statusu i kategorii | Jako użytkownik chcę filtrować dostępną listę po statusie i kategorii, aby szybko odnaleźć interesujące mnie sprawy. | Filtry pozwalają pracować na wybranej części listy. |
| **US-11** | Wyświetlanie komunikatów o błędach formularza | Jako użytkownik chcę wiedzieć, które pola wymagają poprawy, aby móc prawidłowo wysłać formularz. | Walidacja chroni kompletność danych i pozwala użytkownikowi poprawić błędy. |

#### Kryteria akceptacji Must Have

| ID | Given – stan początkowy | When – działanie | Then – oczekiwany wynik |
| --- | --- | --- | --- |
| US-01 | Użytkownik podaje poprawne dane i wolny adres e-mail. | Rejestruje konto, a następnie loguje się. | Powstaje konto mieszkańca, a poprawne logowanie otwiera jego panel. |
| US-01 | Istnieje konto administratora. | Administrator loguje się poprawnymi danymi. | Aplikacja otwiera panel administracji. |
| US-01 | Podany adres jest już używany albo hasło przy logowaniu jest błędne. | Użytkownik wysyła odpowiedni formularz. | Aplikacja wyświetla komunikat. Nie powstaje duplikat konta ani sesja po nieudanym logowaniu. |
| US-02 | Administrator jest zalogowany, a wskazane konto istnieje. | Nadaje temu kontu dozwoloną rolę. | Rola zapisuje się, a użytkownik po ponownym logowaniu uzyskuje dostęp właściwy dla tej roli. |
| US-02 | Mieszkaniec korzysta ze swojego konta. | Próbuje zmienić własną rolę lub rolę innego użytkownika. | Operacja zostaje odrzucona, a role pozostają bez zmian. |
| US-03 | Mieszkaniec jest zalogowany i ma dostęp do poprawnej lokalizacji. | Wysyła formularz z tytułem, opisem, kategorią i lokalizacją. | Aplikacja zapisuje zgłoszenie pod jego kontem ze statusem `nowe` i pokazuje je na jego liście. |
| US-04 | Baza zawiera przykładowy budynek, piętra, pokój i część wspólną. | Mieszkaniec wybiera budynek, piętro i miejsce podczas zgłaszania usterki. | Formularz pokazuje pasujące miejsca, a zapisane zgłoszenie zawiera wybraną lokalizację. |
| US-05 | Dwóch mieszkańców ma zapisane zgłoszenia. | Jeden otwiera swoją listę i szczegóły własnej sprawy. | Widzi wyłącznie własne zgłoszenia i ich aktualne statusy. Dostęp do szczegółów cudzej sprawy zostaje odrzucony. |
| US-06 | Mieszkaniec ma własne zgłoszenie w statusie `nowe`. | Zmienia jego tytuł lub opis. | Poprawione dane są widoczne po odświeżeniu. Status i właściciel pozostają bez zmian. |
| US-06 | Mieszkaniec ma własne zgłoszenie w statusie `nowe`. | Potwierdza jego usunięcie. | Zgłoszenie znika z listy mieszkańca i bieżącej kolejki administratora. |
| US-06 | Zgłoszenie należy do innego mieszkańca lub wyszło ze statusu `nowe`. | Mieszkaniec próbuje je edytować lub usunąć. | Operacja zostaje odrzucona, a dane pozostają bez zmian. |
| US-07 | W kolejce są zgłoszenia różnych mieszkańców. | Administrator otwiera kolejkę i szczegóły wybranej sprawy. | Widzi zgłoszenia z całej kolejki, a w szczegółach tytuł, opis, kategorię, lokalizację, status i priorytet. |
| US-08 | Istnieje zgłoszenie z bieżącym statusem. | Administrator zapisuje dozwoloną zmianę statusu. | Nowy status pojawia się w kolejce i u mieszkańca. Historia zapisuje poprzedni i nowy status, czas oraz osobę zmieniającą. |
| US-08 | Zmiana statusu jest niedozwolona albo próbuje ją wykonać mieszkaniec. | Użytkownik zatwierdza zmianę. | Zmiana zostaje odrzucona, a status i historia pozostają bez zmian. |
| US-09 | Administrator otwiera aktywne zgłoszenie. | Wybiera priorytet i zapisuje zmianę. | Nowy priorytet jest widoczny po odświeżeniu kolejki. |
| US-10 | Lista zawiera zgłoszenia o różnych statusach i kategoriach. | Użytkownik wybiera status i kategorię, a następnie czyści filtry. | W trakcie filtrowania widzi tylko rekordy spełniające oba warunki. Po wyczyszczeniu filtrów wraca pełna lista dostępna dla jego roli. |
| US-11 | W formularzu zgłoszenia brakuje tytułu lub lokalizacji. | Mieszkaniec próbuje wysłać formularz. | Aplikacja wskazuje pola do poprawy i nie zapisuje zgłoszenia. |

### Should Have

| ID | Tytuł w Trello | Historyjka użytkownika |
| --- | --- | --- |
| **US-12** | Dodawanie komentarzy do zgłoszenia | Jako mieszkaniec chcę dodać komentarz do własnego zgłoszenia, aby przekazać dodatkowe informacje administracji. |
| **US-13** | Przypisywanie zgłoszeń do techników | Jako administrator chcę przypisać zgłoszenie technikowi, aby wskazać osobę odpowiedzialną za naprawę. |
| **US-14** | Powiadomienia e-mail o zmianie statusu zgłoszenia | Jako mieszkaniec chcę otrzymać wiadomość e-mail po zmianie statusu, aby wiedzieć o postępie bez otwierania aplikacji. |

#### Kryteria akceptacji Should Have

| ID | Given – stan początkowy | When – działanie | Then – oczekiwany wynik |
| --- | --- | --- | --- |
| US-12 | Mieszkaniec otworzył własne zgłoszenie. | Zapisuje niepusty komentarz. | Komentarz jest widoczny dla mieszkańca i administratora wraz z autorem i czasem dodania. |
| US-13 | Istnieje aktywne zgłoszenie i co najmniej jeden technik dostępny do przypisania. | Administrator wybiera technika i zapisuje przypisanie. | Przypisanie jest widoczne w szczegółach po odświeżeniu. |
| US-14 | Zgłoszenie ma właściciela z adresem e-mail, a wysyłka testowa jest skonfigurowana. | Administrator zapisuje zmianę statusu. | Właściciel otrzymuje wiadomość zawierającą numer zgłoszenia i nowy status. |

### Could Have

| ID | Tytuł w Trello | Historyjka użytkownika | Kryterium akceptacji |
| --- | --- | --- | --- |
| **US-15** | Wyświetlanie statystyk zgłoszeń | Jako administrator chcę widzieć zbiorcze statystyki usterek, aby ocenić obciążenie i sprawdzić, gdzie awarie występują najczęściej. | Dla ustalonego zbioru danych panel pokazuje zgodną z nim liczbę otwartych spraw, średni czas rozwiązania i liczbę zgłoszeń według lokalizacji. |

### Won’t Have This Time

| ID | Tytuł w Trello | Historyjka użytkownika | Uzasadnienie |
| --- | --- | --- | --- |
| **US-16** | Aplikacja mobilna na systemy Android i iOS | Jako mieszkaniec chcę korzystać z natywnej aplikacji, aby otwierać zgłoszenia bez przeglądarki. | W tym wydaniu dostęp zapewnia aplikacja webowa. |
| **US-17** | Integracja z systemem USOS lub uczelnianym SSO | Jako mieszkaniec chcę zalogować się kontem uczelnianym, aby korzystać ze znanych mi danych dostępu. | Integracja wymaga dostępu i uzgodnień z uczelnią. |
| **US-18** | Automatyczna klasyfikacja usterek z wykorzystaniem AI | Jako administrator chcę automatycznie kategoryzować usterki, aby ograniczyć ręczną klasyfikację. | W tym wydaniu kategorię wybiera użytkownik podczas zgłaszania. |

## 5. Wymagania niefunkcjonalne

| ID | MoSCoW | Mierzalne wymaganie | Weryfikacja i uzasadnienie |
| --- | --- | --- | --- |
| **NFR-01** | **M** | Hasła kont są przechowywane jako skróty. Śledzone pliki repozytorium zawierają 0 rzeczywistych haseł, tokenów i kluczy aplikacji. | Sprawdzić zapis dwóch kont testowych oraz pliki repozytorium. Chroni dane uwierzytelniające. |
| **NFR-02** | **M** | Kontrola dostępu odbywa się po stronie serwera. Mieszkaniec otrzymuje odmowę przy próbie odczytu, edycji lub usunięcia cudzej sprawy, zmiany statusu i zmiany ról. | Zweryfikować przypadki na dwóch kontach mieszkańców i jednym koncie administratora. Chroni zgłoszenia i uprawnienia. |
| **NFR-03** | **M** | Model danych zawiera co najmniej trzy powiązane encje, np. konto, zgłoszenie i lokalizację. Po restarcie systemu trzy zapisane zgłoszenia zachowują identyfikatory, lokalizacje, statusy i historię zmian. | Zapisać trzy zgłoszenia, zmienić status co najmniej jednego i sprawdzić dane po restarcie. Zapewnia trwałość kolejki i historii. |
| **NFR-04** | **M** | Zgodnie z README można uruchomić świeży klon projektu i zalogować się na dwa konta testowe o różnych rolach. | Przejść instrukcję w czystym środowisku spełniającym wymagania wstępne. Umożliwia odbiór aplikacji. |
| **NFR-05** | **S** | Przy 100 zgłoszeniach w bazie lista po zastosowaniu filtra pokazuje wyniki do 2 sekund w co najmniej 9 z 10 prób. | Zmierzyć czas od zastosowania filtra do pokazania wyników. Zapisać parametry środowiska testowego. |
| **NFR-06** | **S** | Formularz zgłoszenia można wypełnić i wysłać klawiaturą przy szerokości widoku 360 px i 1280 px. W obu widokach formularz mieści się bez przewijania poziomego. | Przejść scenariusz wysłania poprawnego zgłoszenia w obu szerokościach. |

## 6. Diagram przypadków użycia UML

<img width="1052" height="806" alt="UseCaseDiagramDormTech" src="https://github.com/user-attachments/assets/cfd1ffec-4008-4789-86e8-c5904d4ddea2" />

Diagram obejmuje wszystkie funkcjonalne Must Have. Kod diagramu znajduje się w pliku `docs\scrum\Sprint1_13_11_2026\UseCaseDiagramDormTech.png`.

## 7. Rejestr zmian priorytetów

| Data | Sprint | ID wymagania | Poprzednia kategoria | Nowa kategoria | Powód zmiany |
| --- | --- | --- | --- | --- | --- |
