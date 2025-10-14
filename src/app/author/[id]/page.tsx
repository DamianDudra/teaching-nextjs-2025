import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function AuthorDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();

  const { id } = await params;

  console.log("Author detail id:", id);

  const authorId = parseInt(id);

  if (isNaN(authorId)) {
    return <div>Invalid Author id</div>;
  }

  const author = await db
    .selectFrom("authors")
    .select([
      "authors.name", 
      "authors.bio"
    ])
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (author === null || author === undefined) {
    return <div>Author not found</div>;
  }

  const albums = await db
    .selectFrom("albums")
    .select([
      "albums.id", 
      "albums.name"
    ])
    .where("author_id", "=", authorId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <div>
          <h2 className="text-xl font-semibold mb-4">{author.name}</h2>
          <p>{author.bio ? author.bio : "No bio"}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Albums</h2>
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
      </main>
    </div>
  );
}