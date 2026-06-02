# Implementation Plan - Juice WRLD Music App

A dedicated music player application focused on Juice WRLD's discography. The app will feature a curated list of songs, a functional audio player, and a thematic UI.

## Scope Summary
- **Artist Focus**: Juice WRLD.
- **Features**:
  - Song list with search/filter.
  - Interactive audio player (Play, Pause, Next, Previous, Progress Bar, Volume).
  - Track metadata (Title, Album, Duration, Cover Art).
  - Playlist/Queue management (client-side).
- **Non-Goals**:
  - User accounts/profiles (No Database).
  - Real-time streaming from external APIs like Spotify (due to API key/auth complexity); will use static sample audio or public URLs.
  - Persistence of favorites across sessions (local storage only).

## Assumptions & Risks
- **Audio Sources**: We will use public sample audio URLs or representative placeholders if direct MP3 links for Juice WRLD aren't readily available without auth.
- **Persistence**: All data like "Favorites" or "Last Played" will be stored in `localStorage`.
- **Styling**: Dark-themed, high-energy UI matching the artist's aesthetic.

## Affected Areas
- **Frontend**: React components (Player, Sidebar, SongList, Hero).
- **Data Layer**: Static JSON file or constant containing song metadata (titles, local/remote paths, cover art URLs).
- **Hooks**: Custom `useAudio` hook for managing the `HTMLAudioElement` state.

## Phase 1: Setup & Data Modeling (frontend_engineer)
- Create `src/data/songs.ts` with a curated list of Juice WRLD tracks (placeholder URLs where necessary).
- Define Types/Interfaces for `Song` and `PlayerState`.
- Set up project-wide color variables in `src/index.css` for a "999" / Juice WRLD aesthetic (purples, blacks, dark blues).

## Phase 2: Core Audio Logic (frontend_engineer)
- Implement `useAudioPlayer` custom hook to handle:
  - Play/Pause/Stop.
  - Track switching.
  - Progress/Seek.
  - Volume control.

## Phase 3: UI Components (frontend_engineer)
- **Sidebar**: Navigation (Home, Search, Library).
- **Song Card/Row**: Display individual tracks.
- **Main View**: Hero section with featured album/song and a list of all tracks.
- **Player Bar**: Fixed bottom bar with controls and current track info.
- **Search**: Simple filter on the `songs` array.

## Phase 4: Integration & Polish (frontend_engineer)
- Connect UI buttons to `useAudioPlayer` hook.
- Implement "Favorites" feature using `localStorage`.
- Add animations (e.g., Lucide icons, Framer Motion for transitions).
- Final responsive check (Mobile vs Desktop).

## Phase 5: Quick Fixes (quick_fix_engineer)
- Review for typos in song titles or metadata.
- Adjust spacing/padding based on visual feedback.
- Ensure all icons are consistent.
