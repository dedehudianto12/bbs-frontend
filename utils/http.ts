// Reading an HTTP status back off a thrown fetch error.
//
// `$fetch` rejects on any non-2xx, and the shape of what it throws is not one
// thing: ofetch attaches `status`, Nuxt's own errors carry `statusCode`, and a
// FetchError wrapping a raw Response may only have it under `response.status`.
// Checking a single one of those silently misses the others.
//
// The case that matters most is the one that returns `undefined`: a dropped
// connection, DNS failure or an AbortSignal timeout produces an error with no
// status at all. Callers must not read that as an authorisation verdict or as a
// "not found" — it means the question was never answered. Both call sites here
// (the admin session check and the /jasa/[slug] 404) depend on that distinction.
export function errorStatus(e: unknown): number | undefined {
  const err = e as
    | { status?: number; statusCode?: number; response?: { status?: number } }
    | null
    | undefined
  return err?.status ?? err?.statusCode ?? err?.response?.status
}
