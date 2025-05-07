import { Context } from './Context';
import { useContext } from 'react';

export const useAuthContext = () => useContext(Context);