"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/_ui/primitives/button";
import { ApiError } from "@/lib/api/client";
import { authService } from "@/lib/api/storefront/services";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { loginWithPhone, setProfile } from "@/lib/redux/store/slices/authSlice";
import { fetchCart } from "@/lib/redux/store/slices/cartSlice";

const OTP_CODE_LENGTH = 6;
const COUNTDOWN_INTERVAL_MS = 1_000;

type PhoneOtpMode = "login" | "link";

type PhoneOtpFormProps = {
  mode: PhoneOtpMode;
  onComplete?: () => void | Promise<void>;
};

type OtpDelivery = {
  channel?: string | null;
  expiresInSeconds: number;
};

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function getPhoneAuthError(error: unknown) {
  if (error instanceof ApiError) {
    if (error.errorCode === "phone_already_linked") {
      return "That phone number is already linked to another account.";
    }
    if (error.status === 429) {
      return "Too many attempts. Please wait before requesting another code.";
    }
  }

  return error instanceof Error
    ? error.message
    : "Phone verification failed. Please try again.";
}

export function PhoneOtpForm({ mode, onComplete }: PhoneOtpFormProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [delivery, setDelivery] = useState<OtpDelivery | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1));
    }, COUNTDOWN_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [secondsRemaining]);

  const requestCode = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = { phoneNumber: phoneNumber.trim() };
      const response =
        mode === "login"
          ? await authService.startPhoneAuth(payload)
          : await authService.startPhoneLink(payload);
      setDelivery(response);
      setSecondsRemaining(response.expiresInSeconds);
      setCode("");
    } catch (requestError) {
      setError(getPhoneAuthError(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestCode = async (event: FormEvent) => {
    event.preventDefault();
    await requestCode();
  };

  const handleVerifyCode = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        phoneNumber: phoneNumber.trim(),
        code,
        ...(mode === "login" && fullName.trim()
          ? { fullName: fullName.trim() }
          : {}),
      };

      if (mode === "login") {
        await dispatch(loginWithPhone(payload)).unwrap();
        await dispatch(fetchCart());
      } else {
        await authService.linkPhone(payload);
        const profile = await authService.profile();
        dispatch(setProfile(profile));
      }

      setIsComplete(true);
      await onComplete?.();
    } catch (verifyError) {
      setError(getPhoneAuthError(verifyError));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <output className="block border border-[var(--border)] bg-[var(--paper-deep)] p-4">
        <span className="block font-semibold text-[var(--ink)]">
          Phone number verified.
        </span>
        <span className="mt-2 block text-sm text-[var(--ink-soft)]">
          Your account now has a verified contact for checkout.
        </span>
      </output>
    );
  }

  if (!delivery) {
    return (
      <form onSubmit={handleRequestCode} className="space-y-4">
        <label
          className="flex flex-col gap-2 text-sm font-medium"
          htmlFor={`${mode}-phone`}
        >
          Phone number
          <input
            id={`${mode}-phone`}
            type="tel"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="p-3"
            placeholder="+91 98765 43210"
            required
          />
        </label>
        <p className="text-sm text-[var(--ink-soft)]">
          Include your country code. We’ll send a {OTP_CODE_LENGTH}-digit
          verification code.
        </p>
        {error && (
          <p className="text-sm text-[var(--danger)]" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending code..." : "Continue with phone"}
        </Button>
      </form>
    );
  }

  const deliveryChannel = delivery.channel ? ` by ${delivery.channel}` : "";
  const isBusy = isSubmitting || (mode === "login" && authStatus === "loading");

  return (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div className="border border-[var(--border)] bg-[var(--paper-deep)] p-4 text-sm">
        <p className="font-semibold text-[var(--ink)]">
          Code sent{deliveryChannel}
        </p>
        <p className="mt-2 text-[var(--ink-soft)]">
          Enter the code sent to {phoneNumber}. We’ll sign you in or create your
          account.
        </p>
      </div>
      <label
        className="flex flex-col gap-2 text-sm font-medium"
        htmlFor={`${mode}-code`}
      >
        Verification code
        <input
          id={`${mode}-code`}
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(event) =>
            setCode(
              event.target.value.replace(/\D/g, "").slice(0, OTP_CODE_LENGTH),
            )
          }
          className="p-3 tracking-widest"
          minLength={OTP_CODE_LENGTH}
          maxLength={OTP_CODE_LENGTH}
          pattern={`[0-9]{${OTP_CODE_LENGTH}}`}
          required
        />
      </label>
      {mode === "login" && (
        <label
          className="flex flex-col gap-2 text-sm font-medium"
          htmlFor="phone-full-name"
        >
          Full name{" "}
          <span className="font-normal text-[var(--ink-soft)]">
            (needed only if you’re new)
          </span>
          <input
            id="phone-full-name"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="p-3"
            maxLength={100}
          />
        </label>
      )}
      {error && (
        <p className="text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={isBusy || code.length !== OTP_CODE_LENGTH}
      >
        {isBusy ? "Verifying..." : "Verify and continue"}
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <button
          type="button"
          className="store-link disabled:cursor-not-allowed disabled:text-[var(--muted)] disabled:no-underline"
          disabled={secondsRemaining > 0 || isSubmitting}
          onClick={requestCode}
        >
          {secondsRemaining > 0
            ? `Request another code in ${formatCountdown(secondsRemaining)}`
            : "Request another code"}
        </button>
        <button
          type="button"
          className="store-link"
          onClick={() => {
            setDelivery(null);
            setSecondsRemaining(0);
            setError(null);
          }}
        >
          Change number
        </button>
      </div>
    </form>
  );
}
