import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { getPage, getSiteSettings } from "@/lib/contentful";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Make a tax-deductible donation to Blue Team Village, a 501(c)(3) public charity supporting the cyber defender community.",
};

export default async function DonatePage() {
  const [page, settings] = await Promise.all([
    getPage("donate"),
    getSiteSettings(),
  ]);

  return (
    <article>
      <PageHeader
        logLine="[btv] donate :: tax-deductible"
        heading={page?.heroHeading ?? "Fund the defenders"}
      />
      <div className="mx-auto max-w-4xl px-4">
        {page && <Prose body={page.body} />}
        <p className="mt-10">
          <a
            href={`https://www.paypal.com/donate/?hosted_button_id=${settings.paypalButtonId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-gold px-6 py-4 text-lg font-black text-abyss hover:brightness-110"
          >
            Donate with PayPal ↗
          </a>
        </p>
      </div>
    </article>
  );
}
