export function PageHeader({
  logLine,
  heading,
  sub,
}: {
  logLine: string;
  heading: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-16">
      <p className="log-line">{logLine}</p>
      <h1 className="mt-3 text-4xl font-black text-foam sm:text-5xl">
        {heading}
      </h1>
      {sub && <p className="mt-4 max-w-2xl text-lg text-mist">{sub}</p>}
    </div>
  );
}
