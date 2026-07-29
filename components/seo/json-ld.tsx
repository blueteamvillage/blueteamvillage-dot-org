/*
 * Structured data for search engines. JSON.stringify doesn't escape "<", so
 * it's replaced with its unicode form — the sanitising step the Next JSON-LD
 * guide calls for before using dangerouslySetInnerHTML.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
