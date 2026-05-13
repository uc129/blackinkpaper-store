"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import { useAppSelector } from "@/lib/hooks/redux-hooks";

export default function AccountPage() {
  const router = useRouter();
  const { profile, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?next=/account");
  }, [status, router]);

  return (
    <Page className="max-w-3xl mx-auto py-16">
      <div className="store-surface p-8 space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--ink)]">Account</h1>
          <p className="text-[var(--ink-soft)]">Your BlackInkPaper customer profile.</p>
        </div>
        <div className="grid gap-4 text-sm">
          <p><strong>Name:</strong> {profile?.fullName || "Not provided"}</p>
          <p><strong>Email:</strong> {profile?.email || "Not provided"}</p>
          <p><strong>Email confirmed:</strong> {profile?.emailConfirmed ? "Yes" : "No"}</p>
        </div>
        <Button href="/account/orders">View Orders</Button>
      </div>
    </Page>
  );
}
