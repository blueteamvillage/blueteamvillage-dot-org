import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";
import type { Body } from "@/types/content";

/*
 * Fallback blocks are plain strings, but bare BTV hosts read as links on the
 * page — Contentful rich text marks them up, and local/CI rendering shouldn't
 * diverge from production. Matches full URLs and any *.blueteamvillage.org.
 */
const LINKABLE =
  /((?:https?:\/\/)?(?:[a-z0-9-]+\.)+blueteamvillage\.org(?:\/[^\s]*)?)/gi;

function linkify(text: string) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.startsWith("http") ? part : `https://${part}`;
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-bright underline decoration-teal/40 underline-offset-4 transition-colors hover:text-mint"
      >
        {part}
      </a>
    );
  });
}

/*
 * Contentful hyperlink URIs are author-controlled and land straight in an
 * href. React does not block `javascript:` or `data:` there, so anyone who can
 * publish an entry could plant a script link. Contentful's own editor rarely
 * produces one, but the CMS is a shared space (the CTF site lives in it too)
 * and the check is a few lines — allowlist the schemes that belong in body
 * copy and drop the rest.
 */
const SAFE_SCHEMES = ["http:", "https:", "mailto:", "tel:"];
const PROBE_ORIGIN = "https://link.invalid";
/* A bare host — at least one dot — optionally followed by path/query/hash. */
const HOST_SHAPED = /^[a-z0-9-]+(\.[a-z0-9-]+)+([/?#]|$)/i;

function safeHref(uri: string | undefined): string | undefined {
  const value = uri?.trim();
  if (!value) return undefined;

  // Same-document links.
  if (value.startsWith("#") || value.startsWith("?")) return value;

  // Editors paste bare hosts ("ctf.blueteamvillage.org") and Contentful stores
  // them verbatim. Read those as https rather than dropping the link — same
  // assumption linkify() below makes for fallback copy.
  const candidate = HOST_SHAPED.test(value) ? `https://${value}` : value;

  let url: URL;
  try {
    url = new URL(candidate, PROBE_ORIGIN);
  } catch {
    return undefined;
  }

  // Anything still on the probe origin is a genuine relative path. Note this
  // is the classification step, not just a scheme check: "//evil.com" and
  // "/\evil.com" look relative but resolve off-origin, so they fall through
  // to the scheme allowlist below and get treated as the external links they
  // are — target/rel included — instead of rendering as internal.
  if (url.origin === PROBE_ORIGIN) return candidate;

  return SAFE_SCHEMES.includes(url.protocol) ? url.href : undefined;
}

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-12 text-2xl font-black text-white">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mt-8 text-xl font-black text-white">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mt-4 leading-relaxed text-fog">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-mint">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 marker:text-mint">
        {children}
      </ol>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data?.target?.fields?.file;
      if (!file?.url) return null;
      return (
        <Image
          src={`https:${file.url}`}
          /* Contentful's description field is the alt text; title is the
             asset's filename-ish label, so it's only a fallback. */
          alt={
            node.data.target.fields.description ??
            node.data.target.fields.title ??
            ""
          }
          width={file.details?.image?.width ?? 1200}
          height={file.details?.image?.height ?? 675}
          className="mt-6 rounded-lg border border-white/[0.06]"
        />
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const href = safeHref(node.data.uri as string);
      // A rejected URI still renders its text — dropping the words would lose
      // content, and the link is what's unsafe, not the sentence.
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-teal-bright underline underline-offset-4 hover:text-mint"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

/**
 * Renders normalized body content: Contentful rich text when the CMS
 * is connected, structured fallback blocks otherwise.
 */
export function Prose({ body }: { body: Body }) {
  if (body.kind === "rich") {
    return <div>{documentToReactComponents(body.document, richTextOptions)}</div>;
  }
  return (
    <div>
      {body.blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="mt-12 text-2xl font-black text-white">
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="mt-4 leading-relaxed text-fog">
                {linkify(block.text)}
              </p>
            );
          case "list":
            return (
              <ul
                key={i}
                className="mt-4 list-disc space-y-2 pl-6 marker:text-mint"
              >
                {block.items.map((item) => (
                  <li key={item}>{linkify(item)}</li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
