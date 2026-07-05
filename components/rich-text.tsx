import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";
import type { Body } from "@/types/content";

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-12 text-2xl font-black text-foam">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mt-8 text-xl font-black text-foam">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mt-4 leading-relaxed text-foam/90">{children}</p>
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
          alt={node.data.target.fields.title ?? ""}
          width={file.details?.image?.width ?? 1200}
          height={file.details?.image?.height ?? 675}
          className="mt-6 rounded-lg border border-teal/60"
        />
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const href = node.data.uri as string;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-mint underline underline-offset-4 hover:text-gold"
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
              <h2 key={i} className="mt-12 text-2xl font-black text-foam">
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="mt-4 leading-relaxed text-foam/90">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={i}
                className="mt-4 list-disc space-y-2 pl-6 marker:text-mint"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
