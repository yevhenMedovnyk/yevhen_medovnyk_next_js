import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../redux/store'; // шлях до store.ts

// Отримати всі товари з корзини
export const selectCartItems = (state: RootState) => state.cart.items;

// Загальна кількість товарів (сумарно по quantity_in_cart)
export const selectCartItemCount = (state: RootState) =>
	state.cart.items.reduce((total, item) => total + item.quantity_in_cart, 0);

// Загальна вартість корзини
export const selectCartTotal = (state: RootState) =>
	state.cart.items.reduce((total, item) => total + item.price * item.quantity_in_cart, 0);

export const selectIsInCart = (productId: number) =>
	createSelector(
		(state: RootState) => state.cart.items,
		(items) => items.some((item) => item._id === productId)
	);
