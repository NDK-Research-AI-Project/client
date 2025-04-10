import { toast, DefaultToastOptions } from 'react-hot-toast';

export const showSuccess = (message: string): void => {
  toast.success(message);
};

export const showError = (message: string): void => {
  toast.error(message);
};

export const showLoading = (message: string = 'Loading...') => {
  return toast.loading(message); // returns toastId
};

// export const showCustom = (component: React.ReactNode): any => {
//   return toast.custom(component,);
// };

interface ToastMessages<T = any> {
  loading?: string;
  success?: string | ((data: T) => string);
  error?: string | ((err: string) => string);
}

export const showPromise = <T>(
  promise: Promise<T>,
  messages?: ToastMessages,
  options?: DefaultToastOptions
) => {
  return toast.promise(
    promise,
    {
      loading: messages?.loading || 'Loading...',
      success: messages?.success || 'Success!',
      error: messages?.error || 'Something went wrong!',
    },
    options
  );
};

/**
 * Dismisses a toast notification by its ID
 */
export const dismissToast = (toastId: string): void => {
  toast.dismiss(toastId);
};
