import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const ArtworkIconButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function ArtworkIconButton({ className, type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--ink)] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[var(--paper)] active:scale-90 disabled:cursor-not-allowed disabled:text-[var(--muted)]",
        className,
      )}
      {...props}
    />
  );
});

export function FrostedToolbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "frosted-toolbar flex min-h-14 items-center gap-2 px-3 sm:px-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
