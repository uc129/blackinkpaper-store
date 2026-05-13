export function StoreServerError({ message = "Store server error. Please try again later." }: { message?: string }) {
  return (
    <div className="w-full border border-dashed border-[var(--border)] bg-[var(--paper)] p-8 text-center text-[var(--ink-soft)]">
      <div className="grid gap-5 md:grid-cols-3">
        <div className="aspect-[4/3] bg-[var(--paper-deep)]" />
        <div className="aspect-[4/3] bg-[var(--paper-deep)]" />
        <div className="aspect-[4/3] bg-[var(--paper-deep)]" />
      </div>
      <p className="mt-8 font-display text-2xl font-semibold text-[var(--ink)]">Server error</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}
