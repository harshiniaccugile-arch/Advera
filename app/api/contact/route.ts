import { handleFormSubmission } from '@/lib/form-mail';

export async function POST(req: Request) {
    return handleFormSubmission(req, 'contact');
}
