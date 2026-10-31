# NexusPlay — Modern Mobile Game Download Platform

A professional, modern, premium, and fully responsive mobile gaming download platform built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🎨 Color Palette & Theme

The project adheres strictly to the defined premium dark palette:

- **Main Background**: `#111318`
- **Secondary Background**: `#191E27`
- **Card Background**: `#202733`
- **Primary Accent**: `#00D6B5` (Teal / Emerald)
- **Secondary Accent**: `#8B5CF6` (Vibrant Violet)
- **Main Text**: `#FFFFFF`
- **Secondary Text**: `#A7B0BE`
- **Border Color**: `#303946`

---

## 🚀 Key Features

### 1. Compact Horizontal Game Listing (Core Focus)
- **Left Side**: High-res square game icon with rounded corners and fallback gradient icons.
- **Middle Section**: Game title, crisp 1-2 line description, genre badge, size (e.g. `145 MB`), version (`v2.1.0`), star rating, and downloads count.
- **Right Side**: Clear, high-contrast, touch-friendly **DOWNLOAD** button with download icon.
- **List Layout**: Displayed as a clean vertical list or 2-column compact grid, avoiding oversized vertical banners.

### 2. Header Section
- Custom **NexusPlay** logo with glowing indicator dot.
- Quick navigation: **Home**, **All Games**, **Categories** (with instant genre selector), and **About Us**.
- Search bar focus shortcut (`/` or `Ctrl+K`).
- Mobile-friendly slide-over drawer with full touch navigation.

### 3. Hero Section
- Bold headline: **"Discover Your Next Game"**
- Subtitle: **"Explore and download your favourite mobile games."**
- Subtle, clean gaming geometric grid and soft atmospheric glow.
- Modern instant search bar with live auto-suggestions dropdown and trending tag shortcuts.

### 4. Search & Filter System
- **Instant Search**: Real-time matching by title, developer, category, or tags.
- **Search Suggestions**: Instant preview dropdown with game thumbnail and one-click download.
- **Category Tabs**:
  - All Games
  - Popular Games
  - New Releases
  - Action
  - Adventure
  - Racing
  - Strategy
  - Arcade
  - Puzzle
- **Quick Filters & Sorting**:
  - Offline Play Only
  - Editors' Choice Only
  - Sort by Most Popular, Highest Rated, Latest Updated, or File Size.
- **Empty State**: Clear search button and "Reset All Filters".

### 5. Game Details Page / View (`#/game/:slug`)
- Shareable direct URL hash routing (e.g. `#/game/genshin-impact`).
- Complete technical specifications: Version, File Size, Minimum Android Requirement, Developer, Updated Date, Package Name.
- In-Game Screenshots Gallery with fullscreen image lightbox preview.
- Content tabs: "About Game", "Key Features", and "What's New in vX.X".
- Bookmark / Save game functionality (persisted in `localStorage`).
- Copy link sharing action.
- **Related Games Section**: Displays related titles in matching compact horizontal cards.

### 6. Authorized Download Hub
- Verified security checklist: VirusTotal clean scan (0/72), Google Play Protect certification, verified developer certificates.
- Direct download button with realistic transfer speed simulation (32.4 MB/s) and installer manifest delivery.
- Official Google Play Store direct link button.
- Strictly legitimate download sources with zero fake buttons.

### 7. Interactive Modals & Toast System
- **About Us**: Platform mission, editorial curation standards, safety pledge.
- **Contact Us**: Interactive contact form with form validation and confirmation.
- **Privacy Policy & Terms**: Full legal and transparency documentation.
- **Toast Notifications**: Non-intrusive feedback alerts for actions like copying links, bookmarks, and downloads.

---

## 🛠 Project Structure

```
├── public/
│   └── favicon.svg               # Custom gaming logo SVG favicon
├── src/
│   ├── types/
│   │   └── game.ts               # TypeScript interfaces for games & filters
│   ├── data/
│   │   └── gamesData.ts          # Curated mobile games dataset
│   ├── components/
│   │   ├── Header.tsx            # Navigation bar & mobile menu drawer
│   │   ├── Hero.tsx              # Small hero banner & live search bar
│   │   ├── CategoryFilters.tsx   # Category pills, toggles & sort selector
│   │   ├── GameCard.tsx          # Compact horizontal game card
│   │   ├── GameList.tsx          # Vertical listing & empty state handling
│   │   ├── GameImage.tsx         # Lazy-loaded image with stylized fallback
│   │   ├── GameDetailsModal.tsx  # Full game info, screenshots & specs
│   │   ├── DownloadProgressModal.tsx # Legitimate download hub & security scan
│   │   ├── AboutModal.tsx        # Platform mission & curation pledge
│   │   ├── ContactModal.tsx      # Contact form with validation
│   │   ├── LegalModal.tsx        # Privacy Policy & Terms of Service
│   │   ├── Toast.tsx             # Alert notifications
│   │   └── Footer.tsx            # Footer navigation, legal & copyright
│   ├── App.tsx                   # Main state container & hash router
│   ├── index.css                 # Tailwind v4 theme & custom scrollbar
│   └── main.tsx                  # Application entry point
├── package.json
└── vite.config.ts
```

---

## 💻 Development & Build

### Install dependencies:
```bash
npm install
```

### Start development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build production distribution:
```bash
npm run build
```

---

## ➕ Adding New Games

To add more mobile games to the platform, open `src/data/gamesData.ts` and append a new object adhering to the `Game` interface in `src/types/game.ts`:

```typescript
{
  id: 'game-slug',
  slug: 'game-slug',
  title: 'Game Title',
  shortDescription: 'One or two sentence summary.',
  fullDescription: 'Detailed overview of gameplay.',
  category: 'Action', // One of: 'Action' | 'Adventure' | 'Racing' | 'Strategy' | 'Arcade' | 'Puzzle'
  icon: 'https://...',
  bannerImage: 'https://...',
  screenshots: ['https://...', 'https://...'],
  fileSize: '240 MB',
  version: 'v1.0.0',
  rating: 4.8,
  reviewCount: '1.2M',
  downloads: '50M+',
  developer: 'Studio Name',
  updatedDate: 'Oct 2026',
  minAndroid: 'Android 8.0+',
  packageName: 'com.studio.gamename',
  isPopular: true,
  isNew: true,
  isEditorsChoice: true,
  isOffline: true,
  tags: ['Action', 'Offline', 'Single Player'],
  features: ['Feature 1', 'Feature 2'],
  whatsNew: 'Changelog details...',
  downloadUrl: 'https://...',
  googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.studio.gamename'
}
```
