// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProduct';
import { ICartItem } from '../../types/ICartItem';

interface CartState {
	items: ICartItem[];
}

const initialState: CartState = {
	items: [], // не викликаємо localStorage тут
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action: PayloadAction<ICartItem[]>) => {
			state.items = action.payload;
		},
		addToCart: (state, action: PayloadAction<IProduct>) => {
			const existingItem = state.items.find((item) => item._id === action.payload._id);
			if (existingItem) {
				existingItem.quantity_in_cart += 1;
			} else {
				state.items.push({ ...action.payload, quantity_in_cart: 1 });
			}
			saveCartToLocalStorage(state.items);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item._id !== action.payload);
			saveCartToLocalStorage(state.items);
		},
		decreaseQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find((item) => item._id === action.payload);
			if (item && item.quantity_in_cart > 1) {
				item.quantity_in_cart -= 1;
			} else {
				state.items = state.items.filter((item) => item._id !== action.payload);
			}
			saveCartToLocalStorage(state.items);
		},
		increaseQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find((item) => item._id === action.payload);
			if (item) {
				item.quantity_in_cart += 1;
			}
			saveCartToLocalStorage(state.items);
		},
		clearCart: (state) => {
			state.items = [];
			saveCartToLocalStorage([]);
		},
	},
});

export const { setCart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } =
	cartSlice.actions;

export default cartSlice.reducer;

// локальні утиліти
const saveCartToLocalStorage = (cart: ICartItem[]) => {
	try {
		localStorage.setItem('cart', JSON.stringify(cart));
	} catch (error) {
		console.error('localStorage save error:', error);
	}
};
