import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

type DispathFunc = () => AppDispatch;

export const useAppDispatch: DispathFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
