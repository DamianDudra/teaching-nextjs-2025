import { getDb } from "@/lib/db";

import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).q;

  if (typeof query !== "string") {
    notFound();
  }

  const db = getDb();

  const albums = await db
    .selectFrom("albums")
    .where("albums.name", "like", `%${query}%`)
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
    ])
    .execute();

  const songs = await db
    .selectFrom("songs")
    .where("songs.name", "like", `%${query}%`)
    .innerJoin("albums", "albums.id", "songs.album_id")
    .select([
      "songs.name as name",
      "songs.duration as duration",
      "songs.id as id",
      "albums.name as albumName",
      "albums.id as albumId",
    ])
    .execute();

  const authors = await db
    .selectFrom("authors")
    .where("authors.name", "like", `%${query}%`)
    .selectAll()
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="space-y-8 grid grid-cols-3 gap-3" >
         <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Albums</h2>
          {albums.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  
                </tr>
              </thead>
              <tbody>
                {albums.map((album) => (
                  <tr key={album.id}>
                    <td>
                      <Link
                        href={`/album/${album.id}`}
                        className="hover:underline"
                      >
                        {album.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No albums</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Authors</h2>
          {authors.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author.id}>
                    <td>
                      <Link
                        href={`/album/${author.id}`}
                        className="hover:underline"
                      >
                        {author.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No authors</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Songs</h2>
          {songs.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.id}>
                    <td>
                      <Link
                        href={`/album/${song.id}`}
                        className="hover:underline"
                      >
                        {song.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No songs</p>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}