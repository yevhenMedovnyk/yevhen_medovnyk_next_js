import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';

export const mailApi = createApi({
	reducerPath: 'mailApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	tagTypes: ['Mail'],
	endpoints: (builder) => ({
		sendMail: builder.mutation({
			query: (mail) => ({
				url: '/mail/send-mail',
				method: 'POST',
				body: mail,
			}),
			invalidatesTags: ['Mail'],
		}),
	}),
});

export const { useSendMailMutation } = mailApi;
