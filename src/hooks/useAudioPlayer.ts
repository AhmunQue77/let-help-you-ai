import { useState, useEffect, useRef, useCallback } from "react";
import { Song } from "../types";
import { toast } from "sonner";

export const useAudioPlayer = (initialQueue: Song[]) => {
  const [queue, setQueue] = useState<Song[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = queue[currentIndex] || null;

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Play failed:", err));
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.error("Play failed:", err));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentSong]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  }, [currentIndex, queue.length]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  }, [currentIndex, queue.length]);

  const seek = useCallback((value: number) => {
    if (audioRef.current) {
      const time = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value);
    }
  }, []);

  const playSong = useCallback((song: Song) => {
    const index = queue.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    } else {
      // Add to queue if not present
      const newQueue = [...queue, song];
      setQueue(newQueue);
      setCurrentIndex(newQueue.length - 1);
      setIsPlaying(true);
    }
    toast.success(`Playing: ${song.title}`);
  }, [queue]);

  return {
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
    queue,
  };
};