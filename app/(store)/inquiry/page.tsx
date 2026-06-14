import { Suspense } from 'react';
import { InquiryForm } from './InquiryForm';

export const dynamic = 'force-dynamic';

export default function PreInquiryPage() {
  return (
    <Suspense>
      <InquiryForm />
    </Suspense>
  );
}
