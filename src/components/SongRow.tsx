import React from "react";
import { Play, MoreHorizontal, Heart, Clock } from "lucide-react";
import { Song } from "../types";
import { cn } from "@/lib/utils";

interface SongRowProps {
  song: Song;
  index: number;
  isActive: boolean;
  onPlay: (song: Song) => void;
}

export const SongRow = ({ song, index, isActive, onPlay }: SongRowProps) => {
  return (
    <div
      onClick={() => onPlay(song)}
      className={cn(
        "group grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 items-center rounded-md cursor-pointer transition-all duration-200",
        isActive ? "bg-white/10" : "hover:bg-white/5"
      )}
    >
      <div className="flex items-center justify-center">
        {isActive ? (
          <div className="w-4 h-4 flex items-center justify-center">
             <div className="flex gap-0.5 items-end h-3">
                <div className="w-0.5 bg-purple-500 animate-[bounce_1s_infinite_0.1s] h-full" />
                <div className="w-0.5 bg-purple-500 animate-[bounce_1s_infinite_0.3s] h-2/3" />
                <div className="w-0.5 bg-purple-500 animate-[bounce_1s_infinite_0.5s] h-1/3" />
             </div>
          </div>
        ) : (
          <span className="text-zinc-500 group-hover:hidden text-sm">{index + 1}</span>
        )}
        <Play
          size={16}
          className={cn("text-white hidden group-hover:block", isActive && "block text-purple-500")}
          fill={isActive ? "currentColor" : "none"}
        />
      </div>

      <div className="flex items-center gap-3 overflow-hidden">
        <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded shadow-lg" />
        <div className="flex flex-col truncate">
          <span className={cn("text-white font-medium truncate", isActive && "text-purple-500")}>
            {song.title}
          </span>
          <span className="text-sm text-zinc-400 truncate">{song.artist}</span>
        </div>
      </div>

      <div className="text-zinc-400 text-sm truncate">{song.album}</div>

      <div className="flex items-center justify-end gap-4">
        <Heart size={16} className="text-zinc-500 hover:text-purple-500 transition-colors" />
        <span className="text-zinc-400 text-sm font-mono w-10 text-right">{song.duration}</span>
        <MoreHorizontal size={16} className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};