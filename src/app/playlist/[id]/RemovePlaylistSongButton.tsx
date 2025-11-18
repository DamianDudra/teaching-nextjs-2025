"use client";
import { removeSongFromPlaylist } from "@/app/actions/playlists";

export function RemovePlaylistSongButton(props: {
  playlistId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={async () => {
        console.log("Remove song");
        await removeSongFromPlaylist(props.playlistId, props.songId);
      }}
    >
      Remove
    </button>

  );
}
