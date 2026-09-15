"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, Suspense, useState } from "react";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import { PhoneOtpForm } from "@/features/auth/phone-otp-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { clearAuthError, login } from "@/lib/redux/store/slices/authSlice";
import { fetchCart } from "@/lib/redux/store/slices/cartSlice";

type LoginMethod = "phone" | "email";

function getSafeNextPath(nextPath: string | null) {
  return nextPath?.startsWith("/") && !nextPath.startsWith("//")
    ? nextPath
    : "/store";
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nextPath = getSafeNextPath(params.get("next"));

  const selectMethod = (nextMethod: LoginMethod) => {
    setMethod(nextMethod);
    dispatch(clearAuthError());
  };

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchCart());
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
            Use your phone to sign in or create a customer account.
          </p>
        </div>

        <fieldset className="grid grid-cols-2 gap-2">
          <legend className="sr-only">Choose a login method</legend>
          <Button
            type="button"
            variant={method === "phone" ? "primary" : "secondary"}
            onClick={() => selectMethod("phone")}
            aria-pressed={method === "phone"}
          >
            Phone
          </Button>
          <Button
            type="button"
            variant={method === "email" ? "primary" : "secondary"}
            onClick={() => selectMethod("email")}
            aria-pressed={method === "email"}
          >
            Email
          </Button>
        </fieldset>

        {method === "phone" ? (
          <PhoneOtpForm mode="login" onComplete={() => router.push(nextPath)} />
        ) : (
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
            {auth.error && (
              <p className="text-sm text-[var(--danger)]" role="alert">
                {auth.error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={auth.status === "loading"}
            >
              {auth.status === "loading"
                ? "Signing in..."
                : "Sign in with email"}
            </Button>
            <p className="text-sm text-[var(--ink-soft)]">
              Need an artist account?{" "}
              <Link className="store-link" href="/register">
                Register with email
              </Link>
            </p>
          </form>
        )}
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
