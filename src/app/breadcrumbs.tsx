"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const hiddenSegments = new Set(["shop"]);

const labelBySegment: Record<string, string> = {
  account: "Account",
  admin: "Admin",
  articles: "Articles",
  blog: "Blog",
  cart: "Cart",
  category: "Categories",
  checkout: "Checkout",
  contact: "Contact",
  login: "Login",
  orders: "Orders",
  product: "Products",
  register: "Register",
  store: "Store",
  works: "Works",
};

function formatSegment(segment: string) {
  return labelBySegment[segment] ?? segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments
    .map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      label: formatSegment(segment),
      segment,
    }))
    .filter((crumb) => !hiddenSegments.has(crumb.segment));

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="layout-navbar py-3 text-sm text-[var(--ink-soft)]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-[var(--ink)] hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-2">
              <ChevronRight size={14} aria-hidden="true" className="text-[var(--muted)]" />
              {isCurrent ? (
                <span aria-current="page" className="font-medium text-[var(--ink)]">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="transition hover:text-[var(--ink)] hover:underline">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
