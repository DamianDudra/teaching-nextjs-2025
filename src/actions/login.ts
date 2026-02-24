"use server";
import { getDb } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const db = getDb();
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .where("password", "=", password)
    .executeTakeFirst();

  if (user) {
    const cookieStore = await cookies();
    cookieStore.set("session",String(user.id), {
      httpOnly: true});
      return { success: true };
  }
  return { success: false};
    
}
