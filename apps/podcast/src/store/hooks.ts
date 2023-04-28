import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * the default `Dispatch` type does not know about thunks or other middleware.
 * In order to correctly dispatch thunks, you need to use the specific customized
 * AppDispatch type from the store that includes the thunk middleware types, and use that with useDispatch.
 * Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
// it saves you the need to type (state: RootState) every time
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
