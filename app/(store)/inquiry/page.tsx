import { Suspense } from 'react';
import { InquiryForm } from './inquiry-form';

export default function InquiryPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-16">載入中...</div>}>
      <InquiryForm />
    </Suspense>
  );
}
