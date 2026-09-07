import Link from "next/link";
import Page from "@/components/_ui/containers/base/page";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";

export default function ProductNotFound() {
  return (
    <Page className="py-16">
      <ContainerSimple className="mx-auto max-w-2xl items-center gap-6 text-center">
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
          Artwork unavailable
        </p>
        <h1 className="font-display text-5xl text-[var(--ink)]">
          This piece has found a home.
        </h1>
        <p className="text-lg leading-relaxed text-[var(--ink-soft)]">
          It may have been sold or removed from the collection. Explore the
          store for other available originals and prints.
        </p>
        <Link
          href="/store"
          className="rounded-full bg-[var(--ink)] px-6 py-3 font-medium text-[var(--paper)] transition-colors hover:bg-[var(--ink-soft)]"
        >
          Return to the store
        </Link>
      </ContainerSimple>
    </Page>
  );
}
