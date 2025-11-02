import { StateCreator } from 'zustand';

type DialogType = 'delete' | 'confirm' | 'alert' | null;

interface DialogState {
  isOpen: boolean;
  type: DialogType;
  title: string;
  message: string;
  data: any;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DialogActions {
  openDialog: (params: {
    type: DialogType;
    title: string;
    message: string;
    data?: any;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  closeDialog: () => void;
  confirmDialog: () => void;
}

export type DialogSlice = DialogState & DialogActions;

export const createDialogSlice: StateCreator<
  DialogSlice,
  [['zustand/immer', never]],
  [],
  DialogSlice
> = (set) => ({
  isOpen: false,
  type: null,
  title: '',
  message: '',
  data: null,
  onConfirm: undefined,
  onCancel: undefined,

  openDialog: (params) =>
    set({
      isOpen: true,
      type: params.type,
      title: params.title,
      message: params.message,
      data: params.data,
      onConfirm: params.onConfirm,
      onCancel: params.onCancel,
    }),

  closeDialog: () =>
    set((state) => {
      state.isOpen = false;
      if (state.onCancel) state.onCancel();
    }),

  confirmDialog: () =>
    set((state) => {
      state.isOpen = false;
      if (state.onConfirm) state.onConfirm();
    }),
});
