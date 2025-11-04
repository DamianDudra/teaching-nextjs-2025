import { DB } from "@/lib/db-types";
import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("users").execute();
  await db.deleteFrom("playlists_songs").execute();
  await db.deleteFrom("playlists").execute();
  await db.deleteFrom("albums").execute();
  await db.deleteFrom("songs").execute();
  await db.deleteFrom("authors").execute();
 
  await db
      .insertInto("users")
      .values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        id: 1,
      })
      .execute();
  for (let i = 0; i < 10; i += 1) {
    await db
      .insertInto("users")
      .values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .execute();
  }
  const users = await db.selectFrom("users").selectAll().execute();
    

  for (let i = 0; i < users.length; i += 1) {
    const numPlaylist = faker.number.int({ min: 1, max: 10 });
    for (let i = 0; i < numPlaylist; i += 1){
    await db
      .insertInto("playlists")
      .values({
        name: faker.lorem.words({ min: 1, max: 3}),
        user_id: users[i].id,
      })
      .execute();
  }}

  

  for (let i = 0; i < 20; i += 1) {
    const numBioParagraphs = faker.number.int({ min: 0, max: 5 });

    const bio =
      numBioParagraphs !== 0 ? faker.lorem.paragraph(numBioParagraphs) : null;

    await db
      .insertInto("authors")
      .values({
        name: faker.music.artist(),
        bio,
      })
      .execute();
  }

  const authors = await db.selectFrom("authors").selectAll().execute();

  for (const author of authors) {
    const numAlbums = faker.number.int({ min: 1, max: 10 });

    for (let i = 0; i < numAlbums; i += 1) {
      await db
        .insertInto("albums")
        .values({
          author_id: author.id,
          name: faker.music.album(),
          release_date: faker.date.past().getTime(),
        })
        .execute();
    }
  }

  const albums = await db.selectFrom("albums").selectAll().execute();

  for (const album of albums) {
    const typeOfAlbum = faker.number.int({ min: 0, max: 9 });

    let numSongs = 1;

    if (typeOfAlbum < 2) {
      numSongs = 1;
    } else if (typeOfAlbum < 5) {
      numSongs = faker.number.int({ min: 4, max: 6 });
    } else {
      numSongs = faker.number.int({ min: 10, max: 20 });
    }

    console.log(album.name, numSongs);

    for (let i = 0; i < numSongs; i += 1) {
      await db
        .insertInto("songs")
        .values({
          album_id: album.id,
          name: faker.music.songName(),
          duration: faker.number.int({ min: 90, max: 240 }),
        })
        .execute();
    }
  }



  const playlists = await db.selectFrom("playlists").selectAll().execute();
  const songs = await db.selectFrom("songs").selectAll().execute();

  for (const playlist of playlists) {
    const typeOfPlaylist = faker.number.int({ min: 0, max: 9 });

    let numSongsPlaylist = 1;

    if (typeOfPlaylist < 2) {
      numSongsPlaylist = 1;
    } else if (typeOfPlaylist < 5) {
      numSongsPlaylist = faker.number.int({ min: 4, max: 6 });
    } else {
      numSongsPlaylist = faker.number.int({ min: 10, max: 20 });
    }

    if (numSongsPlaylist > songs.length) {
      numSongsPlaylist = songs.length;
    }

    const usedSongs: number[] = [];

    for (let i = 0; i < numSongsPlaylist; i += 1) {
      let song;
      do {
        const index = faker.number.int({ min: 0, max: songs.length - 1 });
        song = songs[index];
      } while (usedSongs.includes(song.id));

      usedSongs.push(song.id);

      await db
        .insertInto("playlists_songs")
        .values({
          playlist_id: playlist.id,
          song_id: song.id,
        })
        .execute();
    }
    } 
  }