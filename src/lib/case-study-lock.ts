/**
 * Password gating for the case studies that cannot be public.
 *
 * The RBC work is internal and pre-launch, so a client-side reveal would not
 * do: that ships the whole page and hides it with JavaScript, and anyone can
 * read it from view-source. This gate runs in middleware, before the HTML is
 * ever sent.
 *
 * The cookie is not the password. It is an expiry stamped with an HMAC of the
 * password, so the value tells an attacker nothing and changing the password
 * invalidates every cookie already issued.
 *
 * Everything here uses Web Crypto rather than node:crypto, because middleware
 * runs on the edge runtime where node:crypto is not available.
 */

/** Case studies behind the gate. Slugs, matching the MDX filenames. */
export const LOCKED_SLUGS = [
  "rbc-partnership-hub",
  "rbc-business-cards",
] as const;

export const UNLOCK_COOKIE = "cs_unlock";

/**
 * How long an unlock is good for.
 *
 * Long enough to read a study and load its screen recordings, short enough
 * that it is not a pass anyone keeps. The cookie is also a session cookie, so
 * closing the browser ends it regardless of what is left on this clock.
 */
export const UNLOCK_WINDOW_MS = 30 * 60 * 1000;

/**
 * Files under a locked study that stay public.
 *
 * The card in the case studies list shows the device mockup, and the list is
 * public, so this one file has to be reachable without the password. It is a
 * rendering of the product's splash screen, not any of the work.
 *
 * Matched on the name without its extension, so re-encoding the mockup does
 * not silently re-lock it and leave a broken card on a public page.
 */
const PUBLIC_ASSETS = new Set(["device"]);

const MESSAGE = "case-study-unlock:v1";

const encoder = new TextEncoder();

function base64url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return base64url(new Uint8Array(signature));
}

/**
 * Compare without leaking where two strings diverge.
 *
 * Both sides are hashed first so the comparison runs over a fixed 32 bytes
 * whatever the inputs were. Comparing the raw strings would leak their length
 * through the timing, and bail early on the first wrong character.
 */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [x, y] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const left = new Uint8Array(x);
  const right = new Uint8Array(y);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
  return diff === 0;
}

export async function createToken(secret: string): Promise<string> {
  const expiry = Date.now() + UNLOCK_WINDOW_MS;
  return `${expiry}.${await sign(secret, `${MESSAGE}:${expiry}`)}`;
}

export async function verifyToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;

  const separator = token.indexOf(".");
  if (separator < 1) return false;

  const expiry = Number(token.slice(0, separator));
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expected = await sign(secret, `${MESSAGE}:${expiry}`);
  return safeEqual(token.slice(separator + 1), expected);
}

/**
 * The locked study a request is for, or null.
 *
 * Covers the page itself and everything under it, because the screen
 * recordings and mockups live at the same prefix in /public and gating the
 * page while leaving the assets open would be gating nothing.
 */
export function lockedSlugForPath(pathname: string): string | null {
  for (const slug of LOCKED_SLUGS) {
    const base = `/projects/${slug}`;
    if (pathname === base) return slug;
    if (!pathname.startsWith(`${base}/`)) continue;
    const file = pathname.slice(base.length + 1);
    const stem = file.replace(/\.[a-z0-9]+$/i, "");
    return PUBLIC_ASSETS.has(stem) ? null : slug;
  }
  return null;
}

/**
 * The same check for an image the optimiser is about to serve.
 *
 * /_next/image carries its real target in a query parameter, so a locked
 * study's artwork would otherwise be reachable through it.
 */
export function lockedSlugForImageRequest(url: URL): string | null {
  if (url.pathname !== "/_next/image") return null;
  const target = url.searchParams.get("url");
  if (!target || !target.startsWith("/")) return null;
  return lockedSlugForPath(target.split("?")[0]);
}

/** Only ever redirect back into a path we actually gate. */
export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/")) return "/projects";
  return lockedSlugForPath(value) ? value : "/projects";
}

/**
 * Whether an image has to skip the image optimiser.
 *
 * The optimiser does not fetch a /public file from disk. It makes its own HTTP
 * request back to the server for it, and that request carries no cookies, so
 * this middleware turns it away and the optimiser receives an HTML redirect
 * where it expected a PNG. The result is a 400 and a broken image on a page
 * the reader has already unlocked.
 *
 * Letting the internal fetch through on some header would be worse: any header
 * a server can set, a client can forge, and the gate would be bypassable by
 * anyone who guessed it. So gated images are served unoptimised instead. The
 * browser requests them directly, carrying the reader's cookie, and the same
 * middleware check applies to the real request.
 */
export function mustSkipOptimizer(src: string | undefined): boolean {
  return Boolean(src && src.startsWith("/") && lockedSlugForPath(src) !== null);
}
