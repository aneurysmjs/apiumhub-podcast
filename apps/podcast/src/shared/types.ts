import type { RootState } from '@/store';

export interface Action<P> {
  type: string;
  payload: P;
}

export interface ApiMetaType {
  types?: Array<string>;
  callAPI?: () => Promise<any>;
  shouldCallAPI?: (S: RootState) => boolean;
}

export interface AsyncState {
  isLoading: boolean;
  error: boolean | null;
}
