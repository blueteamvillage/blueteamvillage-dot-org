import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-4">
      <p className="log-line text-magenta">[alert] 404 :: page not found</p>
      <h1 className="mt-4 text-4xl font-black text-foam">
        Nothing to detect here.
      </h1>
      <p className="mt-4 text-mist">
        The page you&apos;re looking for doesn&apos;t exist or moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded border border-mint px-5 py-3 font-bold text-mint hover:bg-mint hover:text-abyss"
      >
        Back to the village
      </Link>
    </main>
  );
}
