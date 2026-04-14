import { assertSessionUserId } from "@/actions/login";
import { FollowButton } from "@/components/FollowButton";
import { getDb } from "@/lib/db";
import Link from "next/link";


export default async function FollowingAuthorsPage() {
  const userId = await assertSessionUserId();

  const db = getDb();

  const followingAuthors = await db
    .selectFrom("following_authors")
    .innerJoin("authors", "following_authors.author_id", "authors.id")
    .select([
      "following_authors.id",
      "authors.id as author_id",
      "authors.name",
    ])
    .where("following_authors.user_id", "=", userId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Following Authors</p>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {followingAuthors.map((author, i) => (
                <tr key={author.id}>
                  <td>{i + 1}</td>
                  <td>
                    <Link href={`/author/${author.author_id}`}>{author.name}</Link>
                  </td>
                  <td>
                    <FollowButton authorId={author.author_id} isFollowed={true} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
