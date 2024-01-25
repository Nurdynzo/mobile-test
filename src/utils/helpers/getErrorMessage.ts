export interface ErrorType {
  data?: {
    error?: {
      message?: string;
    };
  };
  message: string;
  TypeError?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: ErrorType | any) =>
  error?.data?.error?.message ?? error?.TypeError ?? 'Something went wrong';
