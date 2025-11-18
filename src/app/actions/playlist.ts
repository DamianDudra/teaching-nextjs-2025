"use server";
import { revalidatePath } from 'next/cache'
import { getDb } from "@/lib/db";

export async function removePlaylist(
  playlistId: number
) {
  const db= getDb();
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .execute();
  await db
    .deleteFrom("playlists")
    .where("id", "=", playlistId)
    .execute();
  console.log(`Removing playlist ${playlistId}`);
  revalidatePath('/playlists');
  
  
}