import React from "react";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { PlayerBar } from "./components/PlayerBar";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { JUICE_WRLD_SONGS } from "./data/songs";
import { Toaster } from "sonner";

function App() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    setVolume,
    togglePlay,
    handleNext,
    handlePrev,
    seek,
    playSong,
  } = useAudioPlayer(JUICE_WRLD_SONGS);

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent
          songs={JUICE_WRLD_SONGS}
          currentSong={currentSong}
          onPlaySong={playSong}
          onTogglePlay={togglePlay}
          isPlaying={isPlaying}
        />
      </div>
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        volume={volume}
        onTogglePlay={togglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeek={seek}
        onVolumeChange={setVolume}
      />
      <Toaster position="top-center" expand={false} richColors theme="dark" />
    </div>
  );
}

export default App;