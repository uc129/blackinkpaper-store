"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { fetchCart } from "@/lib/redux/store/slices/cartSlice";
import { login } from "@/lib/redux/store/slices/authSlice";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(login({ email, password })).unwrap();
    await dispatch(fetchCart());
    router.push(params.get("next") || "/store");
  };

  return (
    <Page className="max-w-md mx-auto py-16">
      <form onSubmit={handleSubmit} className="store-surface p-8 space-y-5">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--ink)]">Login</h1>
          <p className="text-sm text-[var(--ink-soft)]">Access your cart, checkout, and orders.</p>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="p-3"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="p-3"
            required
          />
        </label>
        {auth.error && <p className="text-sm text-[var(--danger)]">{auth.error}</p>}
        <Button type="submit" className="w-full" disabled={auth.status === "loading"}>
          {auth.status === "loading" ? "Signing in..." : "Login"}
        </Button>
        <p className="text-sm text-[var(--ink-soft)]">
          New here? <Link className="underline" href="/register">Create an account</Link>
        </p>
      </form>
    </Page>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Page className="max-w-md mx-auto py-16">Loading...</Page>}>
      <LoginForm />
    </Suspense>
  );
}
