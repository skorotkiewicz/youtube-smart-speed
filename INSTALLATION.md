# 📦 Instrukcja instalacji YouTube Smart Speed

## 🔧 Instalacja w Firefox

### Krok 1: Przygotowanie plików
1. Pobierz wszystkie pliki z folderu projektu
2. Upewnij się, że masz następujące pliki:
   - `manifest.json`
   - `content.js`
   - `brain.js` 
   - `background.js`
   - `popup.html` i `popup.js`
   - `options.html` i `options.js`
   - `overlay.css`

### Krok 2: Załadowanie do Firefox
1. Otwórz Firefox
2. W pasku adresu wpisz: `about:debugging#/runtime/this-firefox`
3. Kliknij **"Załaduj tymczasowy dodatek"**
4. Wybierz plik `manifest.json` z folderu z pluginem
5. Plugin zostanie załadowany i pojawi się ikona w pasku narzędzi

### Krok 3: Pierwsze uruchomienie
1. Przejdź na YouTube.com
2. Kliknij ikonę Smart Speed w pasku narzędzi
3. Sprawdź czy status pokazuje "Smart Speed WŁĄCZONY"
4. Włącz dowolne wideo - plugin rozpocznie automatyczną pracę

## ⚙️ Konfiguracja

### Podstawowe ustawienia
1. Kliknij prawym przyciskiem na ikonę pluginu
2. Wybierz **"Opcje"** lub kliknij "Otwórz ustawienia" w popup
3. Dostosuj parametry do swoich preferencji:
   - **Prędkość minimalna/maksymalna** (domyślnie 2x-3.25x)
   - **Smart Speed** - główny włącznik funkcji
   - **Auto-trening** - czy AI ma się uczyć na bieżąco
   - **HUD** - czy pokazywać informacje na ekranie

### Zaawansowane opcje
- **Reset modelu** - usuwa wytrenowane dane AI i zaczyna od nowa
- **Zakres prędkości** - pełna kontrola od 0.25x do 4x
- **Synchronizacja ustawień** - zachowuje preferencje między sesjami

## 🎯 Pierwsze użycie

1. **Otwórz YouTube** - plugin działa tylko na youtube.com
2. **Włącz wideo** - najlepiej z dialogami (wykłady, wywiady)
3. **Sprawdź HUD** - powinien pokazywać aktualną prędkość
4. **Obserwuj działanie** - podczas ciszy przyspieszy, podczas mowy zwolni

## ❓ Rozwiązywanie problemów

### Plugin nie działa
- Sprawdź czy jesteś na youtube.com
- Odśwież stronę YouTube
- Sprawdź konsole (F12) czy nie ma błędów

### Brak HUD na ekranie  
- Sprawdź ustawienia - czy HUD jest włączony
- Niektóre tryby pełnoekranowe mogą ukrywać HUD

### Plugin nie reaguje na dźwięk
- Sprawdź czy wideo ma dźwięk
- Upewnij się że przeglądarka ma pozwolenie na dostęp do audio
- Chrome może wymagać interakcji użytkownika przed dostępem do audio

### Ustawienia się nie zapisują
- Sprawdź pozwolenia pluginu na dostęp do storage
- Spróbuj wyłączyć i włączyć plugin ponownie

## 🔄 Aktualizacja

Aby zaktualizować plugin:
1. Usuń stary plugin z `about:debugging`
2. Załaduj nową wersję używając tych samych kroków
3. Ustawienia powinny zostać zachowane

## 🗑️ Odinstalowanie

1. Przejdź do `about:debugging#/runtime/this-firefox`
2. Znajdź "YouTube Smart Speed" 
3. Kliknij **"Usuń"**
4. Plugin zostanie całkowicie usunięty wraz z danymi

## 💡 Wskazówki użytkowania

- **Najlepiej działa** z materiałami mówionym (wykłady, podcasty)
- **Auto-trening** poprawia precyzję z czasem
- **Eksperymentuj** z zakresami prędkości dla różnych treści
- **Używaj HUD** do monitorowania działania
- **Reset modelu** gdy AI nie zachowuje się jak oczekujesz

---
**Potrzebujesz pomocy? Sprawdź logi w konsoli deweloperskiej (F12)**