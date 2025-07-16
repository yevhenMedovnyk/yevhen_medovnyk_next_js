import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/IUser';
import { baseUrl } from '../constants';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'user/',
	}),
	tagTypes: ['Users'],
	endpoints: (builder) => ({
		getUserByUID: builder.query<IUser, string | null>({
			query: (uid) => `get-user?uid=${uid}`,
			providesTags: (result) => [{ type: 'Users', id: result?.uid }],
		}),
		createUser: builder.mutation<IUser, IUser>({
			query: (newUser) => ({
				url: 'create-user',
				method: 'POST',
				body: newUser,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
	}),
});

export const { useGetUserByUIDQuery, useCreateUserMutation, useLazyGetUserByUIDQuery } = usersApi;
