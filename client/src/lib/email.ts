import type { InsertContact } from "@shared/schema";

const DEFAULT_RECIPIENT = "lorenzo.algeri03@gmail.com";
const FORM_SUBMIT_ENDPOINT =
  import.meta.env.VITE_CONTACT_EMAIL_ENDPOINT ||
  `https://formsubmit.co/ajax/${DEFAULT_RECIPIENT}`;

type FormSubmitPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  _subject: string;
  _replyto: string;
  _template: "table" | "box";
};

export async function sendContactEmail(data: InsertContact) {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      message: data.message,
      _subject: `Nuova richiesta di consulenza – ${data.name}`,
      _replyto: data.email,
      _template: "table",
    } satisfies FormSubmitPayload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || "Non sono riuscito a inviare l'email di contatto."
    );
  }

  return response.json();
}