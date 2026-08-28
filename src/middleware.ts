import { NextResponse, type NextRequest } from "next/server";

import {
  UNLOCK_COOKIE,
  lockedSlugForImageRequest,
  lockedSlugForPath,
  verifyToken,
} from "@/lib/case-study-lock";

/**
 * Gate the locked case studies before anything is served.
 *
 * With no password configured this fails closed rather than open. The pages it
 * covers are under NDA, so an unset environment variable has to mean nobody
 * gets in, not everybody.
 */
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const slug = lockedSlugForPath(url.pathname) ?? lockedSlugForImageRequest(url);
  if (!slug) return NextResponse.next();

  const secret = process.env.CASE_STUDY_PASSWORD ?? "";
  const unlocked =
    secret.length > 0 &&
    (await verifyToken(request.cookies.get(UNLOCK_COOKIE)?.value, secret));

  if (unlocked) return NextResponse.next();

  const unlock = new URL("/unlock", request.url);
  unlock.searchParams.set("next", `${url.pathname}${url.search}`);
  return NextResponse.redirect(unlock);
}

export const config = {
  matcher: ["/projects/:slug*", "/_next/image"],
};
