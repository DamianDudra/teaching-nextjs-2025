"use client";

import { useContext } from "react";
import { PlaybackContext } from "./playback-context";

export function SideBar() {
  const { currentSong, queue, removeFromQueue } = useContext(PlaybackContext);
  return (
    <div>
      <div>Current Song:</div>
      <div>{currentSong?.name}</div>
      <br />
      <div>Queue:</div>
      <div>
        <ul>
          {queue.map((song) => (
            <li
              key={song.id}
              className="list-disc flex items-center justify-between"
            >
              <span>{song.name}</span>
              <button
                type="button"
                className="btn btn-xs btn-ghost"
                onClick={() => removeFromQueue(song.id)}
                title="Remove from queue"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
