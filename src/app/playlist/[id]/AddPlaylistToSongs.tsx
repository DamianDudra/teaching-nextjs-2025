"use client";
import { AddSongToPlaylist } from "@/app/actions/playlists";


export function AddPlaylistSongButton(props: {
  playlistId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={async () => {
        console.log("Add song");
        await AddSongToPlaylist(props.playlistId);
      }}
    >
      Add
    </button>

  );
}
