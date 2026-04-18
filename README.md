# Aru Record

> Nowoczesna strona studia dubbingowego z portfolio, bazą aktorów głosowych, integracją z YouTube i headless CMS opartym o Sanity.

## Spis treści

- [O projekcie](#o-projekcie)
- [Najważniejsze funkcje](#najważniejsze-funkcje)
- [Stack technologiczny](#stack-technologiczny)
- [Architektura repozytorium](#architektura-repozytorium)
- [Widoki i routing](#widoki-i-routing)
- [Model danych w Sanity](#model-danych-w-sanity)
- [Uruchomienie lokalne](#uruchomienie-lokalne)
- [Zmienne środowiskowe](#zmienne-środowiskowe)
- [Build i wdrożenie](#build-i-wdrożenie)
- [Uwagi techniczne](#uwagi-techniczne)

---

## O projekcie

`Aru Record` to frontendowa aplikacja promująca studio dubbingowe. Strona prezentuje ofertę, zespół aktorów głosowych, realizacje wideo i treści pobierane z Sanity CMS.

Projekt w katalogu głównym jest właściwą aplikacją produkcyjną opartą o `React + Vite + TypeScript`. Repo zawiera też osobny panel `Sanity Studio` w katalogu `studio-aru`, który służy do zarządzania treścią.

## Najważniejsze funkcje

### Frontend

- strona główna z sekcjami hero, współprace z YouTube, aktorzy, usługi i kontakt,
- dynamiczne portfolio projektów pobieranych z Sanity,
- filtrowanie i sortowanie projektów po tytule oraz dacie publikacji,
- lista aktorów głosowych z wyszukiwaniem po imieniu, nazwisku, ksywce i specjalizacji,
- podstrony szczegółowe dla aktorów,
- podstrony szczegółowe dla postów/projektów,
- renderowanie treści `Portable Text` z Sanity,
- odtwarzanie materiałów wideo przez `Mux Player`,
- routing SPA z obsługą bezpośrednich wejść dzięki rewrite w Firebase Hosting.

### CMS i dane

- przechowywanie postów, aktorów głosowych i filmów YouTube w `Sanity`,
- obsługa uploadu wideo przez `sanity-plugin-mux-input`,
- relacje między projektami a obsadą aktorską,
- generowanie adresów obrazów Sanity przez `@sanity/image-url`.

### Integracja z YouTube

- pobieranie najnowszych filmów z kanału YouTube przez API,
- zapisywanie 5 ostatnich materiałów do dokumentów `video` w Sanity,
- wyświetlanie zapisanych rekordów jako sekcja współprac na stronie głównej.

## Stack technologiczny

| Warstwa | Technologie |
| --- | --- |
| Frontend | `React 19`, `TypeScript`, `Vite`, `React Router` |
| Stylowanie | `Tailwind CSS v4`, własne klasy CSS |
| CMS | `Sanity Studio`, `GROQ`, `Portable Text` |
| Media | `Mux Player`, obrazy Sanity |
| Ikony | `Lucide React`, `Font Awesome` |
| Hosting | `Firebase Hosting` |

## Architektura repozytorium

```text
aruRecord/
|-- src/                 # główna aplikacja React/Vite
|-- public/              # statyczne assety frontendowe
|-- studio-aru/          # osobny projekt Sanity Studio
|-- nextjs-aru/          # szkic/prototyp Next.js, obecnie nieużywany produkcyjnie
|-- dist/                # build frontendowy do hostingu
|-- firebase.json        # konfiguracja Firebase Hosting
|-- vite.config.ts       # konfiguracja Vite
|-- package.json         # skrypty i zależności aplikacji głównej
```

### Główne pliki frontendowe

- `src/App.tsx` - definicja tras aplikacji.
- `src/main.tsx` - montowanie aplikacji, `BrowserRouter`, `Navigation`, `Footer`.
- `src/home.tsx` - kompozycja strony głównej.
- `src/sanityClient.ts` - klient Sanity i builder URL obrazów.
- `src/youtubeConnect.tsx` - integracja YouTube API + zapis filmów do Sanity.
- `src/post/postDetail.tsx` - widok projektu/postu z osadzonym wideo Mux.
- `src/aktorzy-glosowi/voiceActorsDetail.tsx` - profil aktora głosowego.

### Sanity Studio

Katalog `studio-aru` jest osobnym projektem developerskim z własnym `package.json`, skryptami i schematami dokumentów. To stąd zarządza się treściami widocznymi na stronie.

## Widoki i routing

| Ścieżka | Widok | Opis |
| --- | --- | --- |
| `/` | Home | Hero, YouTube, aktorzy, usługi, kontakt |
| `/about` | About | Sekcja opisująca studio |
| `/portfolio` | Portfolio | Pełna lista projektów z wyszukiwaniem i sortowaniem |
| `/post/:id` | PostDetail | Szczegóły projektu, opis, obsada, wideo Mux |
| `/aktorzy-glosowi` | AllVoiceActors | Lista wszystkich aktorów |
| `/aktorzy-glosowi/:id` | VoiceActorsDetail | Profil aktora z demo audio i realizacjami |
| `/polityka-prywatnosci` | PrivatePolicy | Strona polityki prywatności |

## Model danych w Sanity

### `post`

Dokument projektu/realizacji:

- `title`
- `slug`
- `publishedAt`
- `image`
- `videoToUpLoad` (`mux.video`)
- `body` (`Portable Text`)
- `cast[]`

Każdy element `cast[]` zawiera:

- referencję do `voiceAcotrs`
- nazwę roli / postaci (`characterName`)

### `voiceAcotrs`

Dokument aktora głosowego:

- `imie`
- `nazwisko`
- `ksywka`
- `slug`
- `specialization`
- `image`
- `body` (`Portable Text`, również z obrazami)
- `demo` (plik audio)

### `video`

Dokument techniczny dla sekcji YouTube:

- `videoID`
- `title`
- `thumbnailsUrl`

## Uruchomienie lokalne

### 1. Frontend

```bash
npm install
npm run dev
```

Domyślnie aplikacja uruchamia się przez Vite.

### 2. Build produkcyjny

```bash
npm run build
npm run preview
```

### 3. Sanity Studio

Przejdź do osobnego katalogu:

```bash
cd studio-aru
npm install
npm run dev
```

### 4. Lint

```bash
npm run lint
```

## Zmienne środowiskowe

Plik `.env.local` w aplikacji głównej korzysta obecnie z:

```env
VITE_YOUTUBE_API_KEY=...
VITE_SANITY_WRITE_TOKEN=...
```

### Znaczenie

- `VITE_YOUTUBE_API_KEY` - klucz do pobierania filmów z YouTube Data API.
- `VITE_SANITY_WRITE_TOKEN` - token zapisu do Sanity używany przez komponent `youtubeConnect.tsx`.

### Ważne

Prefix `VITE_` oznacza, że wartości są dostępne po stronie klienta. W obecnej implementacji token zapisu do Sanity trafia do frontendu, co jest ryzykowne bezpieczeństwowo. Produkcyjnie lepszym rozwiązaniem będzie przeniesienie synchronizacji YouTube -> Sanity do backendu, CRON-a lub serverless function.

## Build i wdrożenie

Frontend jest przygotowany do publikacji na `Firebase Hosting`.

### Istotne elementy konfiguracji

- `firebase.json` wskazuje katalog publikacji: `dist`
- rewrite `** -> /index.html` umożliwia poprawne działanie routingu SPA
- `.firebaserc` wskazuje projekt Firebase: `aru-studio`

Typowy proces:

```bash
npm run build
firebase deploy
```

## Uwagi techniczne

### Co jest aktywnie używane

- aktywna aplikacja znajduje się w katalogu głównym repo,
- `studio-aru` jest aktywnym CMS-em dla treści,
- `nextjs-aru` wygląda na domyślny szkic/prototyp i obecnie nie jest powiązany z głównym wdrożeniem.

### Ograniczenia bieżącej implementacji

- formularz kontaktowy ma warstwę UI, ale nie wysyła danych do backendu,
- część tekstów źródłowych w kodzie ma ślady problemów z kodowaniem znaków,
- w schematach i zapytaniach Sanity występuje nazwa typu `voiceAcotrs`, więc dokumentacja zachowuje tę pisownię zgodnie z aktualnym kodem,
- logika YouTube zapisuje dane do Sanity bezpośrednio z przeglądarki.

### Dla dalszego rozwoju

- przenieść zapis filmów YouTube do bezpiecznej warstwy serwerowej,
- dodać backend lub usługę formularza kontaktowego,
- ujednolicić nazwy typów i poprawić kodowanie polskich znaków w plikach źródłowych,
- rozważyć usunięcie lub wydzielenie `nextjs-aru`, jeśli nie jest już potrzebne.

---

## Szybki start

```bash
npm install
npm run dev
```

Jeżeli chcesz rozwijać także CMS:

```bash
cd studio-aru
npm install
npm run dev
```
