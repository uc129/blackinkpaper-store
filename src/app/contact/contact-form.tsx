"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/_ui/primitives/button";
import { Input } from "@/components/_ui/primitives/input";
import { Textarea } from "@/components/_ui/primitives/textarea";
import { TextLabel } from "@/components/_ui/primitives/typography";
import { ApiError } from "@/lib/api/client";
import {
  type ContactSubmission,
  submitContactForm,
} from "@/lib/api/contact/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm: ContactSubmission = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inquirySubjects = [
  "Original artwork",
  "Print enquiry",
  "Commission",
  "Existing order",
  "Something else",
] as const;

const fieldClassName =
  "h-12 rounded-none border-[var(--border)] bg-[var(--paper)] px-4 shadow-none";

function getContactErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 429)
      return "Too many messages at once. Please wait a minute and try again.";
    if (error.status === 400)
      return "Please check the form details and try again.";
    return error.message;
  }

  return "Something went wrong while sending your message. Please try again.";
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactSubmission>(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof ContactSubmission, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setForm(initialForm);
      setStatus("success");
    } catch (error) {
      setErrorMessage(getContactErrorMessage(error));
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <TextLabel htmlFor="contact-name">Your name</TextLabel>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={fieldClassName}
            required
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <TextLabel htmlFor="contact-email">Email address</TextLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={fieldClassName}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <TextLabel htmlFor="contact-subject">I&apos;m writing about</TextLabel>
        <select
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className={fieldClassName}
          required
        >
          <option value="" disabled>
            Choose a subject
          </option>
          {inquirySubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <TextLabel htmlFor="contact-message">Your message</TextLabel>
        <Textarea
          id="contact-message"
          name="message"
          rows={7}
          placeholder="Tell me about the artwork, project, or order..."
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-48 resize-y rounded-none border-[var(--border)] bg-[var(--paper)] p-4 shadow-none"
          required
        />
      </div>

      {status === "success" && (
        <output className="border border-[var(--border)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink-soft)]">
          Your message has been sent. I will get back to you soon.
        </output>
      )}

      {status === "error" && (
        <p
          className="border border-[var(--danger)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--danger)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-[var(--ink-soft)]">
          All fields are required.
        </p>
        <Button
          type="submit"
          variant="pill"
          size="pill_lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
