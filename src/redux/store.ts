import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from './slices/authSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
	reducer: {
		auth,
		cart,
	},
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
