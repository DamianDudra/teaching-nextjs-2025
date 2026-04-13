"use client";

import { PlaybackContext, Song } from "@/app/playback-context";
import { useContext } from "react";

export function PlayAllButton({ songs }: { songs: Song[] }) {
  const { replaceQueue } = useContext(PlaybackContext);

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => replaceQueue(songs)}
    >
      Play All
    </button>
  );
}
