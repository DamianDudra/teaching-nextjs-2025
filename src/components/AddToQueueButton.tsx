"use client";

import { PlaybackContext, Song } from "@/app/playback-context";
import { useContext } from "react";

export function AddToQueueButton({ song }: { song: Song }) {
  const { addToQueue } = useContext(PlaybackContext);

  return (
    <button
      type="button"
      className="btn btn-xs"
      onClick={() => addToQueue(song)}
      title="Add to queue"
    >
      +Q
    </button>
  );
}
