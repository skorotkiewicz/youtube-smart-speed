# YouTube Smart Speed - AI Playback Control

Inteligentny plugin do Firefox, który automatycznie dostosowuje prędkość odtwarzania YouTube na podstawie analizy audio z użyciem sztucznej inteligencji.

## 🚀 Funkcje

### ✨ Główne możliwości
- **Inteligentne sterowanie prędkością** - AI analizuje audio w czasie rzeczywistym
- **Adaptacyjne przyśpieszanie** - automatycznie przyspiesza podczas ciszy
- **Kontrolowane spowalnianie** - spowalnia podczas wykrycia mowy
- **Uczenie maszynowe** - sieć neuronowa uczy się na podstawie Twojego użytkowania
- **Pełna konfiguracja** - wszystkie parametry można dostosować do preferencji

### ⚙️ Ustawienia użytkownika
- **Zakres prędkości** - ustaw własny zakres od 0.25x do 4x (domyślnie 2x-3.25x)
- **Smart Speed ON/OFF** - łatwe włączanie/wyłączanie funkcjonalności
- **Auto-trening** - włącz/wyłącz uczenie maszynowe sieci neuronowej
- **HUD na ekranie** - pokaż/ukryj informacje o aktualnej prędkości
- **Reset modelu** - rozpocznij trening od nowa

## 📱 Interfejs

### Popup (kliknij ikonę pluginu)
- Szybkie włączanie/wyłączanie Smart Speed
- Podgląd aktualnych ustawień
- Bezpośredni dostęp do opcji

### Strona opcji
- Szczegółowa konfiguracja wszystkich funkcji
- Intuicyjne suwaki do ustawiania prędkości
- Zaawansowane opcje treningu AI

## 🔧 Instalacja

1. Pobierz wszystkie pliki z repozytorium
2. Otwórz Firefox
3. Przejdź do `about:debugging#/runtime/this-firefox`
4. Kliknij "Załaduj tymczasowy dodatek"
5. Wybierz plik `manifest.json` z folderu z pluginem

## 🎯 Jak to działa

Plugin wykorzystuje:
- **Web Audio API** - do analizy audio w czasie rzeczywistym
- **Brain.js** - bibliotekę do uczenia maszynowego
- **Chrome Storage API** - do przechowywania ustawień i wytrenowanego modelu

### Proces działania:
1. Plugin analizuje sygnał audio z wideo YouTube
2. Oblicza RMS (Root Mean Square) dla wykrycia głośności
3. Sieć neuronowa klasyfikuje audio jako "cisza" lub "mowa"
4. Na podstawie wyniku dostosowuje prędkość odtwarzania w zadanym zakresie
5. Model uczy się na bieżąco (jeśli auto-trening włączony)

## 🛠️ Struktura plików

- `manifest.json` - konfiguracja rozszerzenia
- `content.js` - główna logika działania na stronie YouTube  
- `brain.js` - biblioteka uczenia maszynowego
- `background.js` - skrypt w tle do komunikacji
- `popup.html/js` - interfejs popup
- `options.html/js` - strona ustawień
- `overlay.css` - style dla HUD na ekranie

## 🎨 Dostosowanie

Wszystkie parametry można dostosować w ustawieniach:
- **Minimalna prędkość**: jak wolno ma grać podczas mowy
- **Maksymalna prędkość**: jak szybko ma grać podczas ciszy  
- **Próg głośności**: czułość wykrywania ciszy/mowy
- **Częstotliwość analizy**: jak często analizować audio

## 🔍 Debugowanie

Otwórz narzędzia deweloperskie (F12) na YouTube, aby zobaczyć:
- Logi z analizy audio
- Stan sieci neuronowej
- Zapisywanie/wczytywanie modelu
- Komunikaty o błędach

## 📈 Wersja 2.0.0

### Nowe funkcje:
- Pełna konfiguracja przez użytkownika
- Lepszy interfejs popup z podglądem stanu
- Zaawansowane opcje treningu
- Możliwość resetowania modelu
- Ulepszona strona ustawień z wizualnym interfejsem

### Ulepszenia:
- Stabilniejsze działanie
- Lepsze zarządzanie pamięcią
- Optymalizacja wydajności
- Zwiększona kompatybilność

## ⚠️ Wymagania

- Firefox 60+
- Aktywne połączenie z YouTube
- Włączona obsługa JavaScript

## 📝 Licencja

Projekt open-source - możesz swobodnie modyfikować i dostosowywać do własnych potrzeb.

---
**Rozwijane z ❤️ dla społeczności YouTube**