'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Text, Skeleton } from '@/components/ui/atoms';
import { Dialog } from '../organisms/dialog';
import {
  RecordDetailHeader,
  RecordMetricsGrid,
} from '@/components/ui/organisms';
import { useRecordDetail } from '@/hooks/useRecordDetail';
import { useRecordActions } from '@/hooks/useRecordActions';
import { getMetricConfigs } from '@/lib/record-utils';

interface RecordDetailTemplateProps {
  id: string;
}

export function RecordDetailTemplate({ id }: RecordDetailTemplateProps) {
  const router = useRouter();

  const { record, loading, deleteLoading, error } = useRecordDetail(id);
  const { handleDelete, handleExport, isExporting } = useRecordActions(id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="h2" className="text-red-500 mb-4">
            Error Loading Record
          </Text>
          <Text className="mb-6">{error}</Text>
          <Button onClick={() => router.push('/records')}>
            Back to Records
          </Button>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="h2">Record Not Found</Text>
          <Button onClick={() => router.push('/records')} className="mt-4">
            Back to Records
          </Button>
        </div>
      </div>
    );
  }

  const metrics = getMetricConfigs(record);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
        leftIcon={<ArrowLeft size={16} />}
      >
        Back
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 mb-6">
          <RecordDetailHeader
            location={record.location}
            country={record.country}
            savedOn={record.saved_on}
            onDelete={handleDelete}
            onExport={handleExport}
            isDeleting={deleteLoading}
            isExporting={isExporting}
          />
        </div>

        <RecordMetricsGrid metrics={metrics} />
      </div>
      <Dialog />
    </div>
  );
}
