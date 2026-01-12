export type ApiResponse<T = unknown> = {
    status?: number;
    message?: string;
    data?: T;
    // errors?: Record<string, any>;
  };