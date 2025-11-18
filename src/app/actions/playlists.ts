"use server";
import { revalidatePath } from 'next/cache'
import { getDb } from "@/lib/db";

export async function removeSongFromPlaylist(
  playlistId: number,
  songId: number,
) {
  const db= getDb();
  
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .where("song_id", "=", songId)
    .execute();
  console.log(`Removing song ${songId} from playlist ${playlistId}`);
  revalidatePath('/playlist/${playlistId}');
}

export async function addSongToPlaylist(
  notUsedPlaylistId: number
) {
  const db = getDb();
  const playlist = await db
    .selectFrom("playlists")
    .selectAll()
    .where("user_id", "=", 1)
    .executeTakeFirstOrThrow();

  const playlistId = playlist.id;
}
