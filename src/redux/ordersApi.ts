import { createApi } from '@reduxjs/toolkit/query/react';
import { IOrder } from '../types/IOrder';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: baseQueryWithAuth,
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		getOrders: builder.query<IOrder[], void>({
			query: () => '/orders/get-orders',
			providesTags: (result) => (result ? [{ type: 'Orders', id: 'LIST' }] : []),
		}),
		getOrderById: builder.query<IOrder, string>({
			query: (order_id) => `get-order?orderId=${order_id}`,
			providesTags: (result) => (result ? [{ type: 'Orders', id: 'LIST' }] : []),
		}),
		updateOrder: builder.mutation({
			query: ({ order_id, ...updatedData }) => ({
				url: `/orders/update-order`,
				method: 'PUT',
				body: { order_id, ...updatedData },
			}),
			invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
		}),
	}),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery, useUpdateOrderMutation } = ordersApi;
