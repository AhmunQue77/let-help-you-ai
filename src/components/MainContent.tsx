import React from "react";
import { Search, ChevronLeft, ChevronRight, Play, Heart, MoreHorizontal, Clock } from "lucide-react";
import { Song } from "../types";
import { SongRow } from "./SongRow";
import { motion } from "framer-motion";

interface MainContentProps {
  songs: Song[];
  currentSong: Song | null;
  onPlaySong: (song: Song) => void;
  onTogglePlay: () => void;
  isPlaying: boolean;
}

export const MainContent = ({
  songs,
  currentSong,
  onPlaySong,
  onTogglePlay,
  isPlaying,
}: MainContentProps) => {
  const featuredSong = songs[0];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-900/40 via-zinc-950 to-zinc-950">
      {/* Header */}
      <header className="sticky top-0 flex items-center justify-between p-4 bg-transparent z-20">
        <div className="flex gap-4">
          <button className="p-1 rounded-full bg-black/40 text-white">
            <ChevronLeft size={24} />
          </button>
          <button className="p-1 rounded-full bg-black/40 text-white">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search songs, artists..."
              className="bg-zinc-800/50 text-white text-sm rounded-full py-2 pl-10 pr-4 w-64 outline-none focus:ring-1 ring-white/20 transition-all"
            />
          </div>
          <button className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform">
            Go Pro
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-8 pt-4 pb-8 flex flex-col md:flex-row items-end gap-6 relative"
      >
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/416c0ce3-98d3-40e8-a50f-9b0759246493/app-bg-hero-c052e4b6-1780442138340.webp"
          alt="Featured"
          className="w-48 h-48 md:w-60 md:h-60 rounded-xl shadow-2xl object-cover"
        />
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Featured Playlist</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">Juice Essentials</h1>
          <div className="flex items-center gap-2 text-zinc-300 mt-4">
            <span className="font-bold text-white">Juice WRLD</span>
            <span className="text-zinc-500">•</span>
            <span>2024</span>
            <span className="text-zinc-500">•</span>
            <span>{songs.length} songs, 25 min 14 sec</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="px-8 py-6 flex items-center gap-6">
        <button
          onClick={() => onPlaySong(songs[0])}
          className="w-14 h-14 flex items-center justify-center bg-purple-600 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl"
        >
          <Play size={28} className="text-white ml-1" fill="white" />
        </button>
        <Heart size={32} className="text-zinc-400 hover:text-purple-500 cursor-pointer transition-colors" />
        <MoreHorizontal size={32} className="text-zinc-400 hover:text-white cursor-pointer" />
      </div>

      {/* Song List */}
      <div className="px-8 pb-32">
        <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 border-b border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <div className="flex justify-end pr-2">
            <Clock size={16} />
          </div>
        </div>

        <div className="space-y-1">
          {songs.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              isActive={currentSong?.id === song.id}
              onPlay={onPlaySong}
            />
          ))}
        </div>
      </div>
    </div>
  );
};