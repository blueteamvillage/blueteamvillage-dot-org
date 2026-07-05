import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { contentfulConfigured } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Draft preview",
  robots: { index: false },
};

export default async function PreviewPage() {
  const { isEnabled } = await draftMode();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-lg border border-teal/60 bg-navy p-6">
        <p className="log-line">
          [preview] draft mode: {isEnabled ? "enabled" : "disabled"}
        </p>
        <p className="mt-2 text-mist">
          With draft mode on, the public pages render unpublished Contentful
          drafts (bypassing the cache) for your browser only.
          {!contentfulConfigured &&
            " Contentful isn't configured yet, so preview currently shows the same bundled fallback content."}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {/* Plain anchors on purpose: these hit route handlers, and Link
            prefetching would toggle draft mode as a side effect. */}
        {isEnabled ? (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/preview/disable?redirect=/admin/preview"
            className="rounded bg-gold px-5 py-3 font-black text-abyss hover:brightness-110"
          >
            Disable draft mode
          </a>
        ) : (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/preview?redirect=/"
            className="rounded bg-gold px-5 py-3 font-black text-abyss hover:brightness-110"
          >
            Enable draft mode &amp; view site
          </a>
        )}
      </div>
    </div>
  );
}
