import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';
import { IProduct } from '../types/IProduct';

export const storeApi = createApi({
	reducerPath: 'storeApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'store/',
	}),
	tagTypes: ['Store'],
	endpoints: (builder) => ({
		getProducts: builder.query<IProduct[], void>({
			query: () => 'store-items',
			providesTags: (result) => (result ? [{ type: 'Store' as const, id: 'LIST' }] : []),
		}),
		getProductIds: builder.query<
			{ _id: string; imgs: { width: number; height: number }[] }[],
			void
		>({
			query: () => 'store-item-id',
			providesTags: (result) => (result ? [{ type: 'Store' as const, id: 'LIST' }] : []),
		}),
		getProductById: builder.query<IProduct, string>({
			query: (product_id) => ({
				url: '/store-item',
				params: { product_id },
			}),
			providesTags: (result) => (result ? [{ type: 'Store' as const, id: 'LIST' }] : []),
		}),
	}),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductIdsQuery } = storeApi;
