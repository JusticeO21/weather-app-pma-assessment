import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecordStore, useDialogStore } from '@/stores';
import { exportRecords } from '@/lib/api/records';
import { showToast } from '@/lib/toast';

/**
 * Custom hook for managing record actions (delete, export)
 */
export const useRecordActions = (id: string) => {
  const router = useRouter();
  const { removeRecord: deleteRecord } = useRecordStore();
  const { openDialog } = useDialogStore();
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Handle record deletion with confirmation dialog
   */
  const handleDelete = () => {
    openDialog({
      type: 'delete',
      title: 'Delete Record',
      message: 'Are you sure you want to delete this record? This action cannot be undone.',
      data: { id },
      onConfirm: async () => {
        try {
          await deleteRecord(Number(id));
          router.push('/records');
        } catch (err) {
          console.error('Failed to delete record:', err);
          openDialog({
            type: 'alert',
            title: 'Error',
            message: 'Failed to delete the record. Please try again.',
          });
        }
      },
    });
  };

  /**
   * Handle record export with error handling
   */
  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportRecords(Number(id));
    } catch (error: unknown) {
      console.error('Export failed:', error);

      let errorMessage = 'Failed to export record';
      if (error instanceof Error) {
        errorMessage = error.message ?? errorMessage;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }

      showToast('error', errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    handleDelete,
    handleExport,
    isExporting,
  };
};
