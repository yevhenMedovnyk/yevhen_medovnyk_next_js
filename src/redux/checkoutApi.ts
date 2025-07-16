import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';

export const checkoutApi = createApi({
	reducerPath: 'checkoutApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'checkout/',
	}),
	tagTypes: ['Checkout'],
	endpoints: (builder) => ({
		checkout: builder.mutation({
			query: (body) => ({
				url: '/',
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Checkout'],
		}),
		getOrderData: builder.query({
			query: (order_ref) => ({
				url: `order-data?order_ref=${order_ref}`,
			}),
		}),
	}),
});

export const { useCheckoutMutation, useGetOrderDataQuery } = checkoutApi;
