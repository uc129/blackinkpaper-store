"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, Suspense, useState } from "react";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { getSafeNextPath } from "@/lib/navigation/safe-next-path";
import { login } from "@/lib/redux/store/slices/authSlice";
import { mergeGuestCartIntoServer } from "@/lib/redux/store/slices/cartSlice";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const cartError = useAppSelector((state) => state.cart.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nextPath = getSafeNextPath(params.get("next"));

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(mergeGuestCartIntoServer()).unwrap();
      router.push(nextPath);
    } catch {
      // The auth slice exposes the API error beside the form.
    }
  };

  return (
    <Page className="py-16">
      <div className="store-surface mx-auto max-w-md space-y-6 p-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--ink)]">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Sign in with your email to access your cart, checkout, and orders.
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <label
            className="flex flex-col gap-2 text-sm font-medium"
            htmlFor="login-email"
          >
            Email
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="p-3"
              required
            />
          </label>
          <label
            className="flex flex-col gap-2 text-sm font-medium"
            htmlFor="login-password"
          >
            Password
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="p-3"
              required
            />
          </label>
          {(auth.error || cartError) && (
            <p className="text-sm text-[var(--danger)]" role="alert">
              {auth.error || cartError}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={auth.status === "loading"}
          >
            {auth.status === "loading" ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-sm text-[var(--ink-soft)]">
            New here?{" "}
            <Link
              className="store-link"
              href={`/register?next=${encodeURIComponent(nextPath)}`}
            >
              Create an account
            </Link>
          </p>
        </form>

        <aside
          className="border border-[var(--border)] bg-[var(--paper-deep)] p-4"
          aria-label="Phone login availability"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold text-[var(--ink)]">Phone login</p>
            <span className="border border-[var(--border)] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
              Coming soon
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            We are preparing password-free sign-in. Please use your email and
            password for now.
          </p>
        </aside>
      </div>
    </Page>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Page className="py-16">Loading...</Page>}>
      <LoginForm />
    </Suspense>
  );
}
