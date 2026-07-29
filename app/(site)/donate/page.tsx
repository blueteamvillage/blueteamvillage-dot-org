import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
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
        eyebrow="Tax-deductible"
        heading={page?.heroHeading ?? "Fund the defenders"}
      />
      <div className="mx-auto max-w-4xl px-6">
        {page && <Prose body={page.body} />}
        <div className="mt-10">
          {/* Gold is the palette's call-to-action colour — the one place the
              site deliberately steps off the teal button. */}
          <Button
            asChild
            size="lg"
            className="bg-gold text-navy-deep hover:bg-gold/85"
          >
            <a
              href={`https://www.paypal.com/donate/?hosted_button_id=${settings.paypalButtonId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate with PayPal ↗
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
