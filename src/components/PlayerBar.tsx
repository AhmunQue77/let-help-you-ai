import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  ListMusic,
  Maximize2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Song } from "../types";
import { cn } from "@/lib/utils";

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const PlayerBar = ({
  currentSong,
  isPlaying,
  progress,
  duration,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
}: PlayerBarProps) => {
  if (!currentSong) return null;

  return (
    <div className="h-24 bg-zinc-950 border-t border-zinc-800 px-4 flex items-center justify-between z-50">
      {/* Current Song Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-14 h-14 rounded shadow-2xl"
        />
        <div className="flex flex-col truncate">
          <h4 className="text-white text-sm font-semibold truncate hover:underline cursor-pointer">
            {currentSong.title}
          </h4>
          <p className="text-zinc-400 text-xs hover:underline hover:text-white cursor-pointer truncate">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 max-w-[40%] w-full">
        <div className="flex items-center gap-6">
          <Shuffle size={18} className="text-zinc-400 hover:text-white cursor-pointer transition-colors" />
          <SkipBack
            size={22}
            className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
            onClick={onPrev}
          />
          <button
            onClick={onTogglePlay}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:scale-105 transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause size={20} className="text-black" fill="black" />
            ) : (
              <Play size={20} className="text-black ml-0.5" fill="black" />
            )}
          </button>
          <SkipForward
            size={22}
            className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
            onClick={onNext}
          />
          <Repeat size={18} className="text-zinc-400 hover:text-white cursor-pointer transition-colors" />
        </div>

        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-[10px] text-zinc-400 font-mono w-10 text-right">
            {formatTime((progress / 100) * duration)}
          </span>
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={(vals) => onSeek(vals[0])}
            className="w-full"
          />
          <span className="text-[10px] text-zinc-400 font-mono w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end gap-3 w-[30%]">
        <ListMusic size={18} className="text-zinc-400 hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 w-32">
          {volume === 0 ? (
            <VolumeX size={18} className="text-zinc-400" />
          ) : (
            <Volume2 size={18} className="text-zinc-400" />
          )}
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(vals) => onVolumeChange(vals[0] / 100)}
          />
        </div>
        <Maximize2 size={18} className="text-zinc-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};