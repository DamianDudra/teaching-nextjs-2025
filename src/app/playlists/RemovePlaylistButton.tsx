"use client";
import { removePlaylist } from "@/app/actions/playlist";

export function RemovePlaylistButton(props: {
  playlistId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={async () => {
        console.log("Remove playlist");
        await removePlaylist(props.playlistId);
        
      }}
    >
      Remove
    </button>

  );
}
