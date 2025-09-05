# Dodawanie Nowych Serwisów Video

## Jak Dodać Nowy Serwis Video

Rozszerzenie SmartSpeed zostało zaprojektowane tak, aby łatwo można było dodawać nowe serwisy video. Wystarczy kilka prostych kroków!

## 📝 Instrukcja Dodawania Serwisu

### Krok 1: Edytuj plik `src/js/services.js`

Dodaj nową konfigurację do obiektu `VIDEO_SERVICES`:

```javascript
VIDEO_SERVICES.nazwa_serwisu = {
    name: "Nazwa Serwisu",
    domains: ["example.com", "www.example.com", "subdomain.example.com"],
    videoSelector: "video",  // lub inny selektor jeśli potrzebny
    containerSelector: ".video-container",  // kontener dla HUD
    playerContainer: ".video-player",  // główny kontener odtwarzacza
    enabled: true  // ustaw na true aby włączyć
};
```

### Krok 2: Zaktualizuj manifest.json

Dodaj domeny nowego serwisu do sekcji `content_scripts`:

```json
{
    "matches": [
        "*://*.youtube.com/*",
        "*://youtube.com/*",
        "*://*.example.com/*",
        "*://example.com/*"
    ]
}
```

### Krok 3: Popup automatycznie się zaktualizuje

Popup automatycznie pobierze nową konfigurację serwisów poprzez komunikację z content script, więc nie trzeba go ręcznie aktualizować!

### Krok 3: Przetestuj

1. Przeładuj rozszerzenie w Firefoxie
2. Odwiedź stronę nowego serwisu
3. Sprawdź w konsoli developer tools czy serwis został wykryty

## 🎯 Przykłady Konfiguracji

### Przykład 1: Vimeo
```javascript
vimeo: {
    name: "Vimeo",
    domains: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
    videoSelector: "video",
    containerSelector: ".player",
    playerContainer: ".player",
    enabled: true
}
```

### Przykład 2: Dailymotion
```javascript
dailymotion: {
    name: "Dailymotion",
    domains: ["dailymotion.com", "www.dailymotion.com"],
    videoSelector: "video",
    containerSelector: ".player-container",
    playerContainer: ".player-container",
    enabled: true
}
```

### Przykład 3: Disney+ (niestandardowy selektor)
```javascript
disneyplus: {
    name: "Disney+",
    domains: ["disneyplus.com", "www.disneyplus.com"],
    videoSelector: "#hivePlayer",  // Specyficzne ID zamiast klasy
    containerSelector: "#hivePlayer",
    playerContainer: "#hivePlayer",
    enabled: true
}
```

## 🔍 Jak Znaleźć Selektory

### Metoda 1: Narzędzia Developer Tools
1. Otwórz stronę z video w Firefoxie
2. Naciśnij F12 aby otworzyć Developer Tools
3. Kliknij ikonę wyboru elementu (strzałka)
4. Najedź na element video
5. Skopiuj selektor CSS

### Metoda 2: Konsola JavaScript
```javascript
// Znajdź element video
document.querySelector('video')

// Znajdź kontener odtwarzacza
document.querySelector('video').parentElement

// Sprawdź dostępne klasy CSS
document.querySelector('video').parentElement.className
```

## ⚙️ Dostępne Opcje Konfiguracji

| Opcja | Opis | Przykład |
|-------|------|----------|
| `name` | Wyświetlana nazwa serwisu | `"YouTube"` |
| `domains` | Lista obsługiwanych domen | `["youtube.com", "www.youtube.com"]` |
| `videoSelector` | Selektor elementu video | `"video"` lub `".player video"` |
| `containerSelector` | Selektor kontenera dla HUD | `".html5-video-player"` |
| `playerContainer` | Główny kontener odtwarzacza | `".html5-video-player"` |
| `enabled` | Czy serwis jest włączony | `true` lub `false` |

## 🛠️ Funkcje Pomocnicze

Rozszerzenie udostępnia kilka funkcji pomocniczych:

```javascript
// Sprawdź czy aktualna strona jest obsługiwana
isSupportedPage()

// Pobierz informacje o aktualnym serwisie
getCurrentService()

// Pobierz wszystkie włączone serwisy
getEnabledServices()

// Dodaj nowy serwis dynamicznie
addService('nazwa', config)

// Usuń serwis
removeService('nazwa')

// Włącz/wyłącz serwis
toggleService('nazwa', true/false)
```

## 📊 Aktualnie Obsługiwane Serwisy

- ✅ **YouTube** - youtube.com, www.youtube.com, m.youtube.com
- ✅ **Vimeo** - vimeo.com, www.vimeo.com, player.vimeo.com
- ✅ **Dailymotion** - dailymotion.com, www.dailymotion.com
- ✅ **Twitch** - twitch.tv, www.twitch.tv
- ✅ **Netflix** - netflix.com, www.netflix.com
- ✅ **Disney+** - disneyplus.com, www.disneyplus.com

## 🚀 Gotowy Szablon

Skopiuj ten szablon aby szybko dodać nowy serwis:

```javascript
VIDEO_SERVICES.twoj_serwis = {
    name: "Twój Serwis",
    domains: ["twojserwis.com", "www.twojserwis.com"],
    videoSelector: "video",
    containerSelector: ".video-player",
    playerContainer: ".video-player",
    enabled: true
};
```

## 💡 Wskazówki

1. **Testuj na różnych stronach** - niektóre serwisy mają różne layouty
2. **Sprawdzaj kompatybilność** - upewnij się że selektory działają
3. **Dodawaj subdomeny** - player.example.com, embed.example.com itp.
4. **Testuj HUD** - sprawdź czy wyświetla się poprawnie na hover
5. **Monitoruj konsolę** - błędy będą widoczne w Developer Tools

## 🔧 Zaawansowane Konfiguracje

Dla bardziej złożonych serwisów możesz potrzebować:

- **Warunkowe selektory** - różne selektory dla różnych stron
- **Dynamiczne wykrywanie** - automatyczne znajdowanie elementów
- **Fallback selektory** - alternatywne selektory jeśli główne nie działają

---

**Śmiało dodawaj nowe serwisy!** 🎬 Rozszerzenie zostało zaprojektowane aby łatwo się rozszerzać.
