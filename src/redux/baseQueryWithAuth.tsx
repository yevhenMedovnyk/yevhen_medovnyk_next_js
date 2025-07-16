import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuth } from 'firebase/auth';
import { baseUrl } from '../constants';

export const baseQueryWithAuth = fetchBaseQuery({
	baseUrl,
	prepareHeaders: async (headers) => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (user) {
			const token = await user.getIdToken(true); // отримуємо токен Firebase
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});
