import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export const showToast = (type: ToastType, message: string, duration = 3000) => {
  switch (type) {
    case 'success':
      return toast.success(message, { duration });
    case 'error':
      return toast.error(message, { duration });
    case 'loading':
      return toast.loading(message);
    case 'info':
      return toast.info(message, { duration });
    case 'warning':
      return toast.warning(message, { duration });
    default:
      return toast(message, { duration });
  }
};

export const dismissToast = (id: string | number) => {
  toast.dismiss(id);
};
