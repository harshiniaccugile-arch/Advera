import { redirect } from 'next/navigation';
import { POLICIES } from '@/lib/policies-data';

// /policies has no content of its own: send visitors to the first policy.
export default function PoliciesIndex() {
  redirect(`/policies/${POLICIES[0].slug}`);
}
