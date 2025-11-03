import { useEffect } from 'react';
import { useRecordStore } from '@/stores';

/**
 * Custom hook for fetching and managing record detail data
 */
export const useRecordDetail = (id: string) => {
  const { currentRecord, loading, error, getRecord, clearCurrentRecord } =
    useRecordStore();

  useEffect(() => {
    if (id) {
      getRecord(Number(id));
    }

    return () => {
      clearCurrentRecord();
    };
  }, [id, getRecord, clearCurrentRecord]);

  return {
    record: currentRecord,
    loading: loading.fetchOne,
    deleteLoading: loading.delete,
    error,
  };
};
