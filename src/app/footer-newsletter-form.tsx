"use client";

import { type FormEvent, useState } from "react";
import { ApiError } from "@/lib/api/client";
import { submitContactForm } from "@/lib/api/contact/contact";

type SignupStatus = "idle" | "submitting" | "success" | "error";

function getSignupError(error: unknown) {
  if (error instanceof ApiError && error.status === 429) {
    return "Please wait a moment before trying again.";
  }
  return "We could not save your signup. Please try again.";
}

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const normalizedEmail = email.trim();
      await submitContactForm({
        name: "Newsletter subscriber",
        email: normalizedEmail,
        subject: "Newsletter signup",
        message: `Please add ${normalizedEmail} to the BlackInkPaper mailing list.`,
      });
      setEmail("");
      setStatus("success");
      setMessage("Thanks — your signup has been received.");
    } catch (error) {
      setStatus("error");
      setMessage(getSignupError(error));
    }
  };

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor="footer-newsletter-email">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email Address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status !== "submitting") {
            setStatus("idle");
            setMessage("");
          }
        }}
        className="w-full border-0 bg-[#f6f2ea] px-5 py-4 text-sm text-[var(--ink)] outline-none transition-colors"
        required
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#d8d4cb] px-7 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-white disabled:cursor-wait disabled:bg-[#b7aea6]"
      >
        {status === "submitting" ? "Signing Up..." : "Sign Up"}
      </button>
      <p
        className={
          status === "error"
            ? "text-sm text-[#f6f2ea]"
            : "text-sm text-[#c8c0b8]"
        }
        aria-live="polite"
      >
        {message || "We respect your privacy."}
      </p>
    </form>
  );
}
