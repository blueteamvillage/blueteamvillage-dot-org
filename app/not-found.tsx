import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-magenta">
        404 · page not found
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-white">
        Nothing to detect here.
      </h1>
      <p className="mt-4 leading-relaxed text-mist">
        The page you&apos;re looking for doesn&apos;t exist or moved.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">
          Back to the village
          <ArrowRight aria-hidden />
        </Link>
      </Button>
    </main>
  );
}
