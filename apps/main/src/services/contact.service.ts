import type { ContactFormValues } from "../validations/contact.schema"

export type SubmitContactResult = { ok: true } | { ok: false; error: string }

const getFormspreeFormId = (): string | null => {
  // NEXT_PUBLIC_* values are inlined at build/dev start in Next.js.
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID
  return typeof formId === "string" && formId.trim().length > 0 ? formId : null
}

export async function submitContactToFormspree(
  values: ContactFormValues,
): Promise<SubmitContactResult> {
  try {
    const formId = getFormspreeFormId()
    if (!formId) {
      return {
        ok: false,
        error:
          "Missing NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID (set it in .env and restart dev server)",
      }
    }

    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      return { ok: false, error: "Formspree request failed" }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong"
    return { ok: false, error: message }
  }
}
