import { format } from 'date-fns';
import { Text, Button } from '@/components/ui/atoms';
import { Trash2, Download, Loader2 } from 'lucide-react';

interface RecordDetailHeaderProps {
  location: string;
  country: string;
  savedOn: string;
  onDelete: () => void;
  onExport: () => void;
  isDeleting: boolean;
  isExporting: boolean;
}

/**
 * Header section displaying record location, date, and action buttons
 */
export const RecordDetailHeader = ({
  location,
  country,
  savedOn,
  onDelete,
  onExport,
  isDeleting,
  isExporting,
}: RecordDetailHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <Text variant="h2" className="text-gray-900">
          {location}, {country}
        </Text>
        <Text variant="body" className="text-gray-600">
          {format(new Date(savedOn), 'PPPPpppp')}
        </Text>
      </div>
      <div className="flex gap-3">
        <Button
          size="sm"
          variant="ghost"
          className="border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-sm"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <Trash2 size={16} className="mr-2" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 rounded-sm"
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download size={16} className="mr-2" />
              Export
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
