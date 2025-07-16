'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { setCart } from '@/redux/slices/cartSlice';
import { ICartItem } from '@/types/ICartItem';

const CartLoader = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		try {
			const serializedCart = localStorage.getItem('cart');
			const cart: ICartItem[] = serializedCart ? JSON.parse(serializedCart) : [];
			dispatch(setCart(cart));
		} catch (e) {
			console.error('Failed to load cart:', e);
		}
	}, [dispatch]);

	return null;
};

export default CartLoader;
