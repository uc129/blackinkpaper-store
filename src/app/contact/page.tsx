import Page from "@/components/_ui/containers/base/page";
import Section from "@/components/_ui/containers/base/section";
import ContactForm from "./contact-form";

export const metadata = {
  title: "Contact | BlackInkPaper Illustration",
  description:
    "Contact BlackInkPaper Illustration for questions about originals, prints, and commissions.",
};

export default function ContactPage() {
  return (
    <Page className="contact-page">
      <Section className="mx-auto max-w-7xl">
        <header className="border-b border-[var(--border)] pb-10 md:pb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Studio correspondence
          </p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-4xl font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] text-[var(--ink)]">
              Let&apos;s talk about art.
            </h1>
            <p className="max-w-md text-base leading-7 text-[var(--ink-soft)]">
              Ask about an original, choose the right print, or begin a
              commission. A little context helps shape a useful reply.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-12 pt-10 lg:flex-row lg:gap-16 lg:pt-14">
          <aside className="lg:w-[34%] lg:shrink-0">
            <h2 className="font-display text-3xl text-[var(--ink)]">
              Before you write
            </h2>
            <ol className="mt-8 border-t border-[var(--border)]">
              {[
                [
                  "Artwork enquiries",
                  "Share the artwork title, preferred size, and delivery city.",
                ],
                [
                  "Commissions",
                  "Describe the subject, intended use, timing, and approximate size.",
                ],
                [
                  "Existing orders",
                  "Include your order number so the right details can be found quickly.",
                ],
              ].map(([title, description], index) => (
                <li
                  key={title}
                  className="flex gap-4 border-b border-[var(--border)] py-6"
                >
                  <span className="text-xs font-semibold text-[var(--ink-soft)]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-[var(--ink)]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-6 text-[var(--ink-soft)]">
              One clear message is perfect. The form is protected against
              repeated submissions to keep the studio inbox manageable.
            </p>
          </aside>

          <div className="store-surface flex-1 p-6 md:p-10 lg:p-12">
            <div className="mb-8 border-b border-[var(--border)] pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                Send a note
              </p>
              <h2 className="mt-3 font-display text-4xl text-[var(--ink)]">
                What do you have in mind?
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </Page>
  );
}
