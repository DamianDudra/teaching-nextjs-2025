import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE playlists (
    id integer primary key autoincrement not null,
    name text not null,
    user_id integer not null,
    foreign key (user_id) references users (id)
    ) STRICT`.execute(db);

  await sql`CREATE TABLE playlists_songs (
    id integer primary key autoincrement not null,
    playlist_id integer not null,
    song_id integer not null,
    foreign key (playlist_id) references playlists (id),
    foreign key (song_id) references songs (id)
    ) STRICT`.execute(db);
}