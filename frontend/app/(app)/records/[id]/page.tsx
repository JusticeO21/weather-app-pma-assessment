// app/records/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { RecordDetailTemplate } from '@/components/ui/template/record-detail';

export default function RecordDetailPage() {
  const { id } = useParams();

  if (!id || Array.isArray(id)) {
    return <div>Invalid record ID</div>;
  }

  return <RecordDetailTemplate id={id} />;
}
