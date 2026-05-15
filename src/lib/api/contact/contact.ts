import { apiClient } from "@/lib/api/client";

export type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function submitContactForm(submission: ContactSubmission) {
  return apiClient.post<void>("/api/contact", submission);
}
