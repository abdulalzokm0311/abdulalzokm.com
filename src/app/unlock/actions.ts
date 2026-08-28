"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  UNLOCK_COOKIE,
  createToken,
  safeEqual,
  safeNextPath,
} from "@/lib/case-study-lock";

/** Slow every wrong answer down, so the form is not worth scripting against. */
const WRONG_ANSWER_DELAY = 700;

export async function unlock(formData: FormData) {
  const next = safeNextPath(String(formData.get("next") ?? ""));
  const secret = process.env.CASE_STUDY_PASSWORD ?? "";
  const given = String(formData.get("password") ?? "");

  if (secret.length === 0) {
    redirect(`/unlock?next=${encodeURIComponent(next)}&state=unset`);
  }

  if (!(await safeEqual(given, secret))) {
    await new Promise((resolve) => setTimeout(resolve, WRONG_ANSWER_DELAY));
    redirect(`/unlock?next=${encodeURIComponent(next)}&state=wrong`);
  }

  /* No maxAge and no expires, so this is a session cookie: it is gone when
     the browser closes. The token carries its own short expiry on top, so a
     tab left open overnight does not stay unlocked either. */
  const store = await cookies();
  store.set(UNLOCK_COOKIE, await createToken(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect(next);
}
