export interface State<T> {
  isLoading?: boolean;
  data?: T;
  error?: Error;
}

// discriminated union type
export type Action<T> =
  | { type: 'reset' }
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };
