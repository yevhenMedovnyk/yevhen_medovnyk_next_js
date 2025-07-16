import { createApi } from '@reduxjs/toolkit/query/react';
import { IAlbum } from '../types/IAlbum';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const albumsApi = createApi({
	reducerPath: 'albumsApi',
	baseQuery: baseQueryWithAuth,
	tagTypes: ['Albums'],
	endpoints: (builder) => ({
		getAlbums: builder.query<IAlbum[], string>({
			query: (category) => `albums?category=${category}`,
			providesTags: (result) => (result ? [{ type: 'Albums' as const, id: 'LIST' }] : []),
		}),
		getAlbumById: builder.query<IAlbum, string>({
			query: (id) => `albums/album?albumId=${id}`,
			providesTags: (result) => (result ? [{ type: 'Albums' as const, id: 'LIST' }] : []),
		}),
		createAlbum: builder.mutation<IAlbum, IAlbum>({
			query: (newAlbum) => ({
				url: 'albums/create-album',
				method: 'POST',
				body: newAlbum,
			}),
			invalidatesTags: [{ type: 'Albums' as const, id: 'LIST' }],
		}),
		updateAlbum: builder.mutation<IAlbum, Partial<IAlbum> & { albumId: string }>({
			query: ({ albumId, ...updatedData }) => ({
				url: `albums/update-album`,
				method: 'PUT',
				body: { albumId, ...updatedData },
			}),
			invalidatesTags: [{ type: 'Albums', id: 'LIST' }],
		}),

		deleteAlbum: builder.mutation<{ success: boolean }, number>({
			query: (albumId) => ({
				url: `albums/delete-album?albumId=${albumId}`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Albums' as const, id: 'LIST' }],
		}),
	}),
});

export const {
	useGetAlbumsQuery,
	useCreateAlbumMutation,
	useGetAlbumByIdQuery,
	useDeleteAlbumMutation,
	useUpdateAlbumMutation,
} = albumsApi;
