"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { fetchCart } from "@/lib/redux/store/slices/cartSlice";
import { register } from "@/lib/redux/store/slices/authSlice";
import type { RegisterRole } from "@/lib/api/storefront/types";

const REGISTER_ROLES: RegisterRole[] = ["User", "Artist"];

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<RegisterRole>("User");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    await dispatch(register({ fullName, email, password, role })).unwrap();
    await dispatch(fetchCart());
    router.push("/store");
  };

  return (
    <Page className="max-w-md mx-auto py-16">
      <form onSubmit={handleSubmit} className="store-surface p-8 space-y-5">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--ink)]">Create Account</h1>
          <p className="text-sm text-[var(--ink-soft)]">Create a customer account for checkout.</p>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Full name
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="p-3"
            required
            maxLength={100}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="p-3"
            required
            maxLength={256}
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
            minLength={8}
            maxLength={128}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              if (passwordError) setPasswordError("");
            }}
            className="p-3"
            required
            minLength={8}
            maxLength={128}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as RegisterRole)}
            className="p-3"
            required
          >
            {REGISTER_ROLES.map((registerRole) => (
              <option key={registerRole} value={registerRole}>
                {registerRole}
              </option>
            ))}
          </select>
        </label>
        {passwordError && <p className="text-sm text-[var(--danger)]">{passwordError}</p>}
        {auth.error && <p className="text-sm text-[var(--danger)]">{auth.error}</p>}
        <Button type="submit" className="w-full" disabled={auth.status === "loading"}>
          {auth.status === "loading" ? "Creating..." : "Create Account"}
        </Button>
        <p className="text-sm text-[var(--ink-soft)]">
          Already have an account? <Link className="underline" href="/login">Login</Link>
        </p>
      </form>
    </Page>
  );
}
