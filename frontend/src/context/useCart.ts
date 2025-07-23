// context/useCart.ts
import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextType } from './cart.types';

export const useCart = (): CartContextType => useContext(CartContext);