import { StateCreator } from 'zustand';
import { RecordState, RecordActions } from '../../types/store';
import {
  fetchRecords,
  fetchRecord,
  deleteRecord,
  filterRecords,
} from '@/lib/api/records';
import { showToast, dismissToast } from '@/lib/toast';

export type RecordSlice = RecordState & RecordActions;

export const createRecordSlice: StateCreator<
  RecordSlice,
  [['zustand/immer', never]],
  [],
  RecordSlice
> = (set) => ({
  records: [],
  currentRecord: null,
  loading: {
    fetchAll: false,
    fetchOne: false,
    delete: false,
  },
  error: null,

  setRecords: (records) =>
    set((state) => {
      state.records = records;
    }),

  setCurrentRecord: (record) =>
    set((state) => {
      state.currentRecord = record;
    }),

  setLoading: (loading) =>
    set((state) => {
      state.loading = { ...state.loading, ...loading };
    }),

  setError: (error) =>
    set((state) => {
      state.error = error;
    }),

  fetchRecords: async () => {
    try {
      set({
        loading: { fetchAll: true, fetchOne: false, delete: false },
        error: null,
      });
      const records = await fetchRecords();
      set({
        records,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch records';
      showToast('error', errorMessage);
      set({
        error: errorMessage,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
    }
  },

  filterRecordsByLocation: async (location: string) => {
    try {
      set({
        loading: { fetchAll: true, fetchOne: false, delete: false },
        error: null,
      });
      const records = await filterRecords(location);
      set({
        records,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to filter records';
      showToast('error', errorMessage);
      set({
        error: errorMessage,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
    }
  },

  addRecord: (record) =>
    set((state) => {
      state.records = [record, ...state.records];
      showToast('success', 'Record added successfully');
    }),

  removeRecord: async (id) => {
    const loadingId = showToast('loading', 'Deleting record...');
    try {
      set({
        loading: { delete: true, fetchAll: false, fetchOne: false },
        error: null,
      });
      await deleteRecord(id);
      set((state) => {
        state.records = state.records.filter((record) => record.id !== id);
        state.loading = { fetchAll: false, fetchOne: false, delete: false };
      });
      dismissToast(loadingId);
      showToast('success', 'Record deleted successfully');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete record';
      dismissToast(loadingId);
      showToast('error', errorMessage);
      set({
        error: errorMessage,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
      throw error;
    }
  },

  getRecord: async (id: number) => {
    try {
      set({
        loading: { fetchOne: true, fetchAll: false, delete: false },
        error: null,
      });
      const record = await fetchRecord(id);
      set({
        currentRecord: record,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
      return record;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch record';
      showToast('error', errorMessage);
      set({
        error: errorMessage,
        loading: { fetchAll: false, fetchOne: false, delete: false },
      });
      throw new Error(errorMessage);
    }
  },

  clearCurrentRecord: () =>
    set((state) => {
      state.currentRecord = null;
    }),
});
