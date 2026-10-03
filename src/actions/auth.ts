"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { FieldValues } from "react-hook-form";

export async function signUp(values: FieldValues, next?: string) {
  const supabase = await createClient();

  const email = values.email;
  const password = values.password;
  const fullName = values.full_name;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const callbackUrl = new URL("/auth/callback", siteUrl);
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    callbackUrl.searchParams.set("next", next);
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: callbackUrl.toString(),
    },
  });

  if (error) return { error: error.message };

  return { success: true, email };
}

export async function verifySignupOtp({
  email,
  token,
  next,
}: {
  email: string;
  token: string;
  next?: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: token.trim(),
    type: "signup",
  });

  if (error) {
    return { error: error.message };
  }

  const target =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
  redirect(target);
}

export async function resendSignupOtp(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signIn(values: FieldValues, next?: string) {
  const supabase = await createClient();

  const email = values.email;
  const password = values.password;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const target =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
  redirect(target);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function signInWithGoogle(next?: string) {
  const supabase = await createClient();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const callbackUrl = new URL("/auth/callback", siteUrl);
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    callbackUrl.searchParams.set("next", next);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });

  if (error) return { error: error.message };

  if (data.url) redirect(data.url);
}

export async function forgotPassword(values: FieldValues) {
  const supabase = await createClient();
  const email = values.email;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function resetPassword(values: FieldValues) {
  const supabase = await createClient();
  const password = values.password;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) return { error: error.message };

  redirect("/login");
}
