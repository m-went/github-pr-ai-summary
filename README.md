# GitHub PR AI Summary Bot

Automatyczny system do analizy Pull Requestów na GitHubie z wykorzystaniem AI.

Aplikacja reaguje na utworzenie lub aktualizację Pull Requesta, pobiera informacje o zmianach w kodzie, analizuje je przy pomocy Google Gemini oraz publikuje wygenerowane podsumowanie jako komentarz bezpośrednio w Pull Requeście.

---

# Cel projektu

Celem projektu jest automatyzacja procesu code review poprzez wykorzystanie AI do przygotowania szybkiego przeglądu zmian w Pull Requestach.

System pomaga zespołowi developerskiemu szybciej zrozumieć:

- jakie zmiany zostały wprowadzone,
- jakie funkcjonalności dodano lub zmodyfikowano,
- które obszary systemu zostały zmienione,
- jakie potencjalne ryzyka mogą wystąpić.

---

# Architektura rozwiązania

Developer
|
| Pull Request / Update Pull Request
|
v

GitHub Webhook
|
| HTTP POST event
|
v

Node.JS (Express)
|
v

GitHub API  
|
| Get changed files
|
v

Changed files  
|
| Prepare diffs  
|  
v

Gemini API
|
v

AI Summary
|
v

GitHub Pull Request Comment

---

# Technologie

## Backend

- Node.js
- Express
- TypeScript

## Integracje

- GitHub REST API
- GitHub Webhooks
- Google Gemini API

## Biblioteki

- `express` - obsługa webhooków HTTP
- `@octokit/rest` - komunikacja z GitHub API
- `@google/generative-ai` - integracja z Gemini
- `dotenv` - zarządzanie konfiguracją środowiskową

---

# Jak działa aplikacja?

## 1. Utworzenie lub aktualizacja Pull Requesta

System nasłuchuje zdarzeń:

- `pull_request.opened`
- `pull_request.synchronize`

Webhook GitHuba wysyła informacje do aplikacji.

## 2. Walidacja zdarzenia

Aplikacja sprawdza:

- czy event pochodzi z Pull Requesta,
- czy akcja wymaga analizy.

Pozostałe zdarzenia są ignorowane.

## 3. Pobranie zmian

Za pomocą GitHub API pobierane są zmienione pliki:

GET /repos/{owner}/{repo}/pulls/{pull_number}/files

Pobierane informacje:

- nazwa pliku,
- status zmiany,
- liczba dodanych linii,
- liczba usuniętych linii,
- fragment diff.

## 4. Filtrowanie zmian

Przed wysłaniem danych do AI system usuwa nieistotne pliki.

Ignorowane są między innymi:

- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`
- pliki konfiguracyjne
- pliki IDE
- pliki binarne

Przykłady ignorowanych rozszerzeń:

.png
.jpg
.mp4
.zip
.pdf
.exe

Dzięki temu:

- zmniejszana jest liczba tokenów,
- poprawiana jest jakość odpowiedzi AI,
- unikane są niepotrzebne koszty.

## 5. Analiza AI

Przygotowany diff jest przekazywany do Google Gemini.

Model otrzymuje instrukcję przygotowania:

- podsumowania zmian,
- listy nowych funkcjonalności,
- listy zmodyfikowanych plików,
- potencjalnych ryzyk.

## 6. Publikacja komentarza

Wygenerowany tekst jest automatycznie dodawany jako komentarz do Pull Requesta.

---

# Konfiguracja

## Instalacja

```bash
git clone <repository-url>

cd github-pr-ai-summary

npm install

```

## Przygotowanie zmiennych środowiskowych

Utwórz plik:

.env

i dodaj:

PORT=default_3000
GITHUB_TOKEN=your_github_token
GEMINI_API_KEY=your_gemini_api_key

## Uruchomienie

npm run start

Aplikacja uruchomi webhook pod:

POST /github-webhook

Do testowania lokalnego wykorzystano ngrok.
