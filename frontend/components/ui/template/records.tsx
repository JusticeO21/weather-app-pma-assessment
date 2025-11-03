'use client';

import { useRecordStore } from '@/stores';
import { useEffect, useState } from 'react';
import { RecordsList } from '@/components/ui/organisms/record-list';
import { Text, Input, Button } from '@/components/ui/atoms';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, Download } from 'lucide-react';
import { exportRecords } from '@/lib/api/records';
import { showToast } from '@/lib/toast';

export function RecordsTemplate() {
  const { records, loading, error, fetchRecords, filterRecordsByLocation } =
    useRecordStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleExportAll = async () => {
    if (records.length === 0) {
      showToast('error', 'No records to export');
      return;
    }

    try {
      setIsExporting(true);
      await exportRecords();
      showToast(
        'success',
        `Successfully exported ${records.length} record${records.length > 1 ? 's' : ''}`,
      );
    } catch (error) {
      console.error('Export failed:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to export records';
      showToast('error', errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Filter when debounced search query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      filterRecordsByLocation(debouncedSearchQuery.trim());
    } else {
      fetchRecords();
    }
  }, [debouncedSearchQuery, filterRecordsByLocation, fetchRecords]);

  return (
    <div className="mx-auto px-4 py-8 w-full">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Text variant="h2" className="text-gray-900 text-xl">
              Weather Records
            </Text>
            <Text variant="body" className="text-gray-600">
              View your saved weather records
            </Text>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleExportAll}
            disabled={isExporting || loading.fetchAll || records.length === 0}
            className="border border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 rounded-sm"
          >
            {isExporting ? (
              'Exporting...'
            ) : (
              <>
                <Download size={16} />
                <span>Export All ({records.length})</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Filter by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchQuery && records.length > 0 && (
            <Text variant="caption" className="text-gray-600 whitespace-nowrap">
              {records.length} result{records.length > 1 ? 's' : ''}
            </Text>
          )}
        </div>
        {searchQuery && (
          <Text variant="caption" className="text-gray-500 mt-2">
            {loading.fetchAll
              ? 'Searching...'
              : `Filtering by: "${searchQuery}"`}
          </Text>
        )}
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      ) : (
        <RecordsList records={records} loading={loading.fetchAll} />
      )}
    </div>
  );
}
