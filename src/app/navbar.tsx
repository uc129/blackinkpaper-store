"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/_ui/primitives/links";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { logout } from "@/lib/redux/store/slices/authSlice";
import { clearCartState } from "@/lib/redux/store/slices/cartSlice";

const primaryNavItems = [
  { text: "Store", href: "/store" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const f = overlayRef.current?.querySelectorAll<HTMLElement>("a,button");
    f?.[0]?.focus();
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && f && f.length) {
        const i = [...f].indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open]);

  const { cart } = useAppSelector((state) => state.cart);
  const authStatus = useAppSelector((state) => state.auth.status);
  const totalItemsCount = cart?.itemCount ?? 0;
  const isAuthenticated = authStatus === "authenticated";

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(clearCartState());
  };

  return (
    <>
      <nav
        id="main-navbar"
        className="sticky top-0 z-40 bg-[var(--primary)] py-4 sm:py-5 lg:py-6"
      >
        <div className="layout-navbar flex items-center justify-between gap-4 lg:gap-8">
          <NavLink
            href="/"
            text="BlackInkPaper"
            linkSize="xl"
            boldVariant="bold"
            className="max-w-[15rem] leading-tight sm:max-w-none font-display text-[var(--ink)]"
          />

          <div className="flex items-center gap-6">
            <div className="main-nav-links items-center gap-5 2xl:gap-7">
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  text={item.text}
                  href={item.href}
                  className="text-[var(--ink)]"
                />
              ))}
              <NavLink
                text="Cart"
                href="/store/shop/cart"
                sup={totalItemsCount > 0 ? totalItemsCount.toString() : ""}
              />
              {isAuthenticated ? (
                <>
                  <NavLink text="Account" href="/account" />
                  <NavLink text="Orders" href="/account/orders" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm relative group w-fit underline-offset-5 hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink text="Login" href="/login" />
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="main-nav-menu-trigger size-10 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--paper-deep)]"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-controls="main-navbar-mobile"
                aria-expanded={open}
              >
                <Menu size={24} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {open && (
        <div
          id="main-navbar-mobile"
          className="fixed inset-0 z-50 overflow-y-auto bg-[var(--primary)] text-[var(--ink)]"
        >
          <div className="layout-navbar flex items-center justify-between gap-4 py-4 sm:py-6">
            <div className="font-display text-xl font-bold leading-tight sm:text-2xl">
              BlackInkPaper
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--paper-deep)]"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.8} />
            </button>
          </div>

          <div className="layout-navbar pb-10 pt-6 sm:pt-10">
            <div
              ref={overlayRef}
              className="mobile-nav-links flex flex-col gap-4 leading-[1.02] sm:gap-5"
            >
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  text={item.text}
                  href={item.href}
                  onClick={() => setOpen(false)}
                />
              ))}
              <NavLink
                text="Cart"
                href="/store/shop/cart"
                sup={totalItemsCount > 0 ? totalItemsCount.toString() : ""}
                onClick={() => setOpen(false)}
              />
              {isAuthenticated ? (
                <>
                  <NavLink
                    text="Account"
                    href="/account"
                    onClick={() => setOpen(false)}
                  />
                  <NavLink
                    text="Orders"
                    href="/account/orders"
                    onClick={() => setOpen(false)}
                  />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  text="Login"
                  href="/login"
                  onClick={() => setOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
