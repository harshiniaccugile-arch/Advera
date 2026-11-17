import { handleFormSubmission } from '@/lib/form-mail';

// Sends the application (all fields + resume and cover letter) to
// CAREERS_TO_EMAIL through Brevo. See lib/form-mail.ts.
export async function POST(request: Request) {
    return handleFormSubmission(request, 'careers');
}
