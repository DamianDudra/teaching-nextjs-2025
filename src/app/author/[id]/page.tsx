import { FollowButton } from "@/components/FollowButton";
import { getDb } from "@/lib/db";
import Link from "next/link";
import { getSessionUserId } from "@/actions/login";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getSessionUserId();
  const db = getDb();

  const { id } = await params;

  console.log("Album detail id:", id);

  const authorId = parseInt(id);

  if (isNaN(authorId)) {
    return <div>Invalid Album id</div>;
  }

  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (author == null) {
    return <div>Author not found</div>;
  }

  const albums = await db
    .selectFrom("albums")
    .selectAll()
    .where("author_id", "=", author.id)
    .execute();

  const isFollowed = await db
    .selectFrom("following_authors")
    .select("id")
    .where("author_id", "=", authorId)
    .where("user_id", "=", userId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>Name: {author.name}</div>
        <div>Bio: {author.bio}</div>
        <FollowButton authorId={authorId} isFollowed={isFollowed.length>0} />
        <div>
          Albums:
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.id}`}>{album.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
