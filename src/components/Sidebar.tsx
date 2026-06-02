import React from "react";
import { Home, Search, Library, PlusSquare, Heart, Mic2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div
    className={cn(
      "flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors duration-200",
      active ? "text-white" : "text-zinc-400 hover:text-white"
    )}
  >
    <Icon size={24} />
    <span className="font-semibold">{label}</span>
  </div>
);

export const Sidebar = () => {
  return (
    <div className="w-64 bg-black flex flex-col h-full border-r border-zinc-800">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-purple-600 p-2 rounded-lg">
          <Mic2 className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Juice Music</h1>
      </div>

      <nav className="flex-1 px-2">
        <SidebarItem icon={Home} label="Home" active />
        <SidebarItem icon={Search} label="Search" />
        <SidebarItem icon={Library} label="Your Library" />

        <div className="mt-8 space-y-1">
          <SidebarItem icon={PlusSquare} label="Create Playlist" />
          <SidebarItem icon={Heart} label="Liked Songs" />
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-800 px-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Your Playlists</p>
          <div className="space-y-3">
            {["Juice Essentials", "Goodbye & Good Riddance", "999 Forever", "Unreleased Gems"].map((playlist) => (
              <p key={playlist} className="text-sm text-zinc-400 hover:text-white cursor-pointer truncate">
                {playlist}
              </p>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};