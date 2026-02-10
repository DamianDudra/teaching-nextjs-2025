"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function recordPlaybackEvent(
  eventName: string,
  songId: number,
  userId = 1
) {
  const db = getDb();

  await db
    .insertInto("playback_events")
    .values({
      event_name: eventName,
      event_date: Date.now(),
      user_id: userId,
      song_id: songId,
    })
    .execute();

  revalidatePath("/history");
}

export async function recordPlaybackStart(songId: number, userId = 1) {
  return recordPlaybackEvent("playback_start", songId, userId);
}

export async function recordPlaybackEnd(songId: number, userId = 1) {
  return recordPlaybackEvent("playback_end", songId, userId);
}

export async function getPlaybackEvents(userId = 1) {
  const db = getDb();

  const events = await db
    .selectFrom("playback_events")
    .innerJoin("songs", "playback_events.song_id", "songs.id")
    .leftJoin("users", "playback_events.user_id", "users.id")
    .select([
      "playback_events.id",
      "playback_events.event_name",
      "playback_events.event_date",
      "playback_events.song_id as song_id",
      "songs.name as song_name",
      "songs.album_id as album_id",
    ])
    .where("playback_events.user_id", "=", userId)
    .orderBy("playback_events.event_date", "desc")
    .execute();

  return events;
}
