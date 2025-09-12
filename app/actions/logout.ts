"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  await supabase.auth.signOut();

  await cookieStore.delete("user-role");
  await cookieStore.delete("user-id");
  await cookieStore.delete("user-email");

  redirect("/auth/login");
}
