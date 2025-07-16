import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from './slices/authSlice';
import cart from './slices/cartSlice';
import { imagesApi } from './imagesApi';
import { albumsApi } from './albumsApi';
import { usersApi } from './usersApi';
import { storeApi } from './storeApi';
import { mailApi } from './mailApi';
import { checkoutApi } from './checkoutApi';
import { ordersApi } from './ordersApi';

export const store = configureStore({
	reducer: {
		[imagesApi.reducerPath]: imagesApi.reducer,
		[albumsApi.reducerPath]: albumsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[storeApi.reducerPath]: storeApi.reducer,
		[mailApi.reducerPath]: mailApi.reducer,
		[checkoutApi.reducerPath]: checkoutApi.reducer,
		auth,
		cart,
		[ordersApi.reducerPath]: ordersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			imagesApi.middleware,
			albumsApi.middleware,
			usersApi.middleware,
			mailApi.middleware,
			storeApi.middleware,
			checkoutApi.middleware,
			ordersApi.middleware,
		]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
