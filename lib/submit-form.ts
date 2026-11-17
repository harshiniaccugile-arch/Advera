/**
 * Client-side helper: posts a <form> to one of the mail routes.
 *
 *   const result = await submitForm('/api/contact', e.currentTarget);
 *   if (result.ok) { ...show thank-you... } else { ...show result.error... }
 *
 * Every input needs a `name` attribute. Add one hidden honeypot input named
 * "website" (see ContactView.tsx for the markup).
 */
export async function submitForm(
    endpoint: string,
    form: HTMLFormElement,
): Promise<{ ok: boolean; error?: string }> {
    try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form) });
        const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
        if (res.ok && data?.ok) return { ok: true };
        return { ok: false, error: data?.error ?? 'Something went wrong. Please try again.' };
    } catch {
        return { ok: false, error: 'Network error. Please check your connection and try again.' };
    }
}
