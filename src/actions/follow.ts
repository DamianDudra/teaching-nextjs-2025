"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertSessionUserId } from "./login";

export async function followAuthor(authorId: number) {
  const userId = await assertSessionUserId();
  
  await getDb()
    .insertInto("following_authors")
    .values({ user_id: userId, author_id: authorId, created_at: Date.now() })
    .onConflict((oc) => oc.columns(["user_id", "author_id"]).doNothing())
    .execute();
  revalidatePath("/");
}

export async function unfollowAuthor(authorId: number) {
  const userId = await assertSessionUserId();

  const db = getDb();
  await db
    .deleteFrom("following_authors")
    .where("user_id", "=", userId)
    .where("author_id", "=", authorId)
    .execute();
  revalidatePath("/");
}
