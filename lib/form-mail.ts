import { NextResponse } from 'next/server';

/**
 * Shared handler for the Contact and Careers forms.
 * Reads a multipart/form-data POST, emails every submitted field (plus any
 * uploaded files) through Brevo's transactional email API, and replies with
 * JSON: { ok, success, error? }. (`success` mirrors `ok` for older client code.)
 *
 * Field names are NOT hard-coded. Every non-empty text field is listed in the
 * email under a readable label, so adding a field to a form needs no changes
 * here. Only `email` is required (it becomes the Reply-To address).
 *
 * Environment variables (see .env.local.example):
 *   BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME,
 *   CONTACT_TO_EMAIL, CAREERS_TO_EMAIL (falls back to CONTACT_TO_EMAIL)
 */

export type FormKind = 'contact' | 'careers';

const BREVO_URL = process.env.BREVO_API_URL ?? 'https://api.brevo.com/v3/smtp/email';

const MAX_TOTAL_FILE_BYTES = 4 * 1024 * 1024; // all files combined; stays under Vercel's ~4.5 MB request cap
const MAX_FILES = 3;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
const MAX_FIELD_LENGTH = 5000;
const MAX_FIELDS = 40;
const HONEYPOT_FIELD = 'website'; // hidden input; real people leave it empty

const KIND_CONFIG: Record<FormKind, { title: string; toEnv: string }> = {
    contact: { title: 'New project enquiry', toEnv: 'CONTACT_TO_EMAIL' },
    careers: { title: 'New job application', toEnv: 'CAREERS_TO_EMAIL' },
};

/** Nicer labels for field names that do not humanize well on their own. */
const LABELS: Record<string, string> = {
    need: 'Needs',
    budget: 'Budget and timeline',
    company: 'Company or brand',
    currentCtc: 'Current CTC',
    expectedSalary: 'Expected salary',
    experience: 'Years of experience',
    linkedin: 'LinkedIn URL',
    hearAbout: 'How they heard about us',
    referredBy: 'Referred by',
    organization: 'Current organization',
};

/* ------------------------------ helpers ------------------------------ */

type Body = { ok: boolean; error?: string; message?: string };

const json = (body: Body, status = 200) =>
    NextResponse.json({ ...body, success: body.ok }, { status });

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const humanize = (key: string) => {
    if (LABELS[key]) return LABELS[key];
    const spaced = key
        .replace(/[_-]+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .trim();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
};

const oneLine = (value: string, max = 150) => value.replace(/[\r\n]+/g, ' ').slice(0, max);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Best-effort limiter. On serverless hosts each instance has its own memory,
   so this slows down casual abuse; it is not a hard guarantee. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_HITS = 30;

function rateLimited(ip: string): boolean {
    const now = Date.now();
    if (hits.size > 500) {
        for (const [key, entry] of hits) if (entry.resetAt < now) hits.delete(key);
    }
    const entry = hits.get(ip);
    if (!entry || entry.resetAt < now) {
        hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }
    entry.count += 1;
    return entry.count > MAX_HITS;
}

const clientIp = (req: Request) =>
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

/* ------------------------------ handler ------------------------------ */

export async function handleFormSubmission(req: Request, kind: FormKind) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'harshini.accugile@gmail.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Advera Website';
    const to =
        process.env[KIND_CONFIG[kind].toEnv] || (kind === 'contact' ? 'kushal@adorack.com' : 'harshini.accugile@gmail.com');

    if (!apiKey || !senderEmail || !to) {
        console.error('[form-mail] Missing BREVO_API_KEY, BREVO_SENDER_EMAIL or recipient env var');
        return json({ ok: false, error: 'Email service is not configured.' }, 500);
    }

    if (rateLimited(clientIp(req))) {
        return json({ ok: false, error: 'Too many submissions. Please try again later.' }, 429);
    }

    let form: FormData;
    try {
        form = await req.formData();
    } catch {
        return json({ ok: false, error: 'Invalid form submission.' }, 400);
    }

    // Text fields. A key that appears more than once (checkbox groups) is merged
    // into one comma-separated value, keeping first-seen order.
    const merged = new Map<string, string[]>();
    const files: File[] = [];

    for (const [key, value] of form.entries()) {
        if (key === HONEYPOT_FIELD) continue;
        if (typeof value === 'string') {
            const text = value.trim();
            if (!text) continue;
            const list = merged.get(key) ?? [];
            list.push(text.slice(0, MAX_FIELD_LENGTH));
            merged.set(key, list);
        } else if (value.size > 0) {
            files.push(value);
        }
    }

    const fields: Array<[string, string]> = [...merged].map(([key, list]) => [
        key,
        list.join(', ').slice(0, MAX_FIELD_LENGTH),
    ]);

    if (fields.length > MAX_FIELDS) {
        return json({ ok: false, error: 'Too many fields.' }, 400);
    }

    const lookup = (...names: string[]) =>
        fields.find(([key]) => names.includes(key.toLowerCase()))?.[1];

    const email = lookup('email', 'e-mail', 'emailaddress', 'email_address');
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
        return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
    }
    const name = lookup('name', 'fullname', 'full_name', 'full-name') || 'Website visitor';
    const role = kind === 'careers' ? lookup('role') : undefined;

    // Files: PDF/DOC/DOCX, a few at most, 4 MB combined.
    if (files.length > MAX_FILES) {
        return json({ ok: false, error: 'Too many files attached.' }, 400);
    }
    let totalBytes = 0;
    for (const file of files) {
        const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return json({ ok: false, error: 'Please upload PDF, DOC or DOCX files only.' }, 415);
        }
        totalBytes += file.size;
    }
    if (totalBytes > MAX_TOTAL_FILE_BYTES) {
        return json({ ok: false, error: 'The files are too large. Please keep them under 4 MB combined.' }, 413);
    }

    const attachments: Array<{ name: string; content: string }> = [];
    const used = new Set<string>();
    for (const [i, file] of files.entries()) {
        let fileName = file.name.replace(/[^\w.\- ]+/g, '_').slice(0, 120);
        if (used.has(fileName)) fileName = `${i + 1}-${fileName}`;
        used.add(fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({ name: fileName, content: buffer.toString('base64') });
    }

    const { title } = KIND_CONFIG[kind];
    const rows = fields
        .map(
            ([key, value]) =>
                `<tr>` +
                `<td style="padding:8px 12px;border:1px solid #e4e7ec;background:#f9fafb;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(humanize(key))}</td>` +
                `<td style="padding:8px 12px;border:1px solid #e4e7ec;white-space:pre-wrap">${escapeHtml(value)}</td>` +
                `</tr>`,
        )
        .join('');

    const htmlContent =
        `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#101828">` +
        `<h2 style="margin:0 0 16px">${escapeHtml(title)}${role ? `: ${escapeHtml(role)}` : ''}</h2>` +
        `<table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>` +
        (attachments.length
            ? `<p style="margin-top:16px">Attachments: ${attachments.map((a) => escapeHtml(a.name)).join(', ')}</p>`
            : '') +
        `<p style="margin-top:16px;color:#667085;font-size:12px">Sent from the website on ${new Date().toUTCString()}. Reply to this email to answer ${escapeHtml(name)} directly.</p>` +
        `</div>`;

    const payload = {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        replyTo: { email, name: oneLine(name, 70) },
        subject: oneLine(`${title}${role ? ` (${role})` : ''} from ${name}`),
        htmlContent,
        ...(attachments.length ? { attachment: attachments } : {}),
    };

    try {
        const res = await fetch(BREVO_URL, {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'content-type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
            console.error('[form-mail] Brevo rejected the email', res.status, await res.text().catch(() => ''));
            return json({ ok: false, error: 'We could not send your message. Please try again later.' }, 502);
        }
    } catch (error) {
        console.error('[form-mail] Could not reach Brevo', error);
        return json({ ok: false, error: 'We could not send your message. Please try again later.' }, 502);
    }

    return json({ ok: true, message: 'Sent successfully.' });
}
