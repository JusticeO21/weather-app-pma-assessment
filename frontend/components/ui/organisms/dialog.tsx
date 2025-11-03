import { useDialogStore } from '@/stores';
import { Button } from '../atoms';
import { X } from 'lucide-react';

export const Dialog = () => {
  const { isOpen, type, title, message, closeDialog, confirmDialog } =
    useDialogStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={closeDialog}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <Button
            variant="ghost"
            onClick={closeDialog}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={confirmDialog}
            className={`${
              type === 'delete'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {type === 'delete' ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
};
