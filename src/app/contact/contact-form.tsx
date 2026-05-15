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
    <form onSubmit={handleSubmit} className="grid gap-4 text-left">
      <div className="grid gap-2">
        <TextLabel htmlFor="contact-name">Name</TextLabel>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <TextLabel htmlFor="contact-email">Email</TextLabel>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <TextLabel htmlFor="contact-subject">Subject</TextLabel>
        <Input
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <TextLabel htmlFor="contact-message">Message</TextLabel>
        <Textarea
          id="contact-message"
          name="message"
          rows={7}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
        />
      </div>

      {status === "success" && (
        <p className="rounded-lg border border-[var(--border)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink-soft)]">
          Your message has been sent. I will get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-lg border border-[var(--danger)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--danger)]">
          {errorMessage}
        </p>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="pill"
          size="pill_lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
