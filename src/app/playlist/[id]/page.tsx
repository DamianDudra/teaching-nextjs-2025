import { getDb } from "@/lib/db";
import Link from "next/link";
import { RemovePlaylistSongButton } from "./RemovePlaylistSongButton";
import { AddSongToPlaylist } from "./RemovePlaylistSongButton";

function formatDuration(dur: number): string {
  const m = Math.floor(dur / 60);
  const s = dur % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function PlaylistDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();
  const { id } = await params;
  const playlistId = Number(id);

  if (isNaN(playlistId)) {
    return <div>Invalid Playlist id</div>;
  }
  const playlist = await db
    .selectFrom("playlists")
    .select(["name", "id"])
    .where("id", "=", playlistId)
    .executeTakeFirst();

  if (playlist === null || playlist === undefined) {
    return <div>Playlist not found</div>;
  }

  const songs = await db
    .selectFrom("playlists_songs")
    .innerJoin("songs", "songs.id", "playlists_songs.song_id")
    .select([
      "songs.id", 
      "songs.name", 
      "songs.duration"
    ])
    .where("playlists_songs.playlist_id", "=", playlistId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h2 className="text-xl font-semibold mb-4">{playlist.name}</h2>
          <Link href="/playlists" className="hover:underline text-sm">Back to Playlists </Link>
        </div>
        <div>
          {songs.length ? (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song, i) => (
                  <tr key={song.id}>
                    <td>{i + 1}</td>
                    <td>{song.name}</td>
                    <td>{formatDuration(song.duration)}</td>
                    <td>
                    <RemovePlaylistSongButton
                      playlistId={playlist.id}
                      songId={song.id}
                    />
                  </td>
                  </tr>
                  
                ))}
              </tbody>
              <div>
                <AddSongToPlaylist 
                playlistId={playlist.id}
                songId={song.id} />
              </div>
            </table>
          ): (
            <p className="text-center">No songs.</p>
          )}
        </div>
      </main>
    </div>
  );
}