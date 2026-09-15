"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import { PhoneOtpForm } from "@/features/auth/phone-otp-form";
import { useAppSelector } from "@/lib/hooks/redux-hooks";

export default function AccountPage() {
  const router = useRouter();
  const { profile, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?next=/account");
  }, [status, router]);

  return (
    <Page className="py-16">
      <div className="store-surface mx-auto max-w-3xl space-y-6 p-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--ink)]">
            Account
          </h1>
          <p className="text-[var(--ink-soft)]">
            Your BlackInkPaper customer profile.
          </p>
        </div>
        <div className="grid gap-4 text-sm">
          <p>
            <strong>Name:</strong> {profile?.fullName || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {profile?.email || "Not provided"}
          </p>
          <p>
            <strong>Email confirmed:</strong>{" "}
            {profile?.emailConfirmed ? "Yes" : "No"}
          </p>
          <p>
            <strong>Phone:</strong> {profile?.phoneNumber || "Not provided"}
          </p>
          <p>
            <strong>Phone confirmed:</strong>{" "}
            {profile?.phoneNumberConfirmed ? "Yes" : "No"}
          </p>
        </div>
        {status === "authenticated" &&
          profile &&
          !profile.phoneNumberConfirmed && (
            <section
              id="phone-verification"
              className="border-t border-[var(--border)] pt-6"
            >
              <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
                Verify a phone number
              </h2>
              <p className="mb-4 mt-2 text-sm text-[var(--ink-soft)]">
                A verified email or phone number is required before checkout.
              </p>
              <PhoneOtpForm mode="link" />
            </section>
          )}
        <Button href="/account/orders">View Orders</Button>
      </div>
    </Page>
  );
}
