import { Eyebrow } from "@/components/site/eyebrow";

export function PageHeader({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string;
  heading: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
        {heading}
      </h1>
      {sub && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">{sub}</p>
      )}
    </div>
  );
}
