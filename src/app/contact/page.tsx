import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import { Heading } from "@/components/_ui/primitives/heading";
import { TextDescription } from "@/components/_ui/primitives/typography";
import ContactForm from "./contact-form";

export const metadata = {
  title: "Contact | BlackInkPaper Illustration",
  description:
    "Contact BlackInkPaper Illustration for questions about originals, prints, and commissions.",
};

export default function ContactPage() {
  return (
    <Page className="contact-page">
      <Section className="mx-auto">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <article className="flex flex-col gap-5">
            <Heading as="h1" size="title" className="text-[var(--ink)]">
              Contact
            </Heading>
            <TextDescription className="max-w-xl text-left">
              Ask about a print, an original piece, or a commission. Share the
              artwork name if you have one in mind, and I will reply with
              availability, pricing, or next steps.
            </TextDescription>

            <div className="mt-4 grid gap-4 border-t border-[var(--border)] pt-6 text-sm leading-7 text-[var(--ink-soft)]">
              <p>
                For artwork inquiries, include size, delivery city, and whether
                you are looking for an original or print.
              </p>
              <p>
                Messages are rate-limited to keep the studio inbox tidy, so one
                clear note is perfect.
              </p>
            </div>
          </article>

          <div className="border border-[var(--border)] bg-[var(--paper)] p-5 shadow-sm sm:p-6">
            <ContactForm />
          </div>
        </div>
      </Section>
    </Page>
  );
}
