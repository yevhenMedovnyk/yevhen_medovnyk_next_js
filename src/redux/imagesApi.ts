import { createApi } from '@reduxjs/toolkit/query/react';
import { IImage } from '../types/IImage';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const imagesApi = createApi({
	reducerPath: 'imagesApi',
	baseQuery: baseQueryWithAuth,
	tagTypes: ['Images'],

	endpoints: (builder) => ({
		getImages: builder.query<IImage[], string | undefined>({
			query: (albumId) => `/images/all-images-in-album?albumId=${albumId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),
		//getImageIds: builder.query<{ _id: string; width: number; height: number }[], string>({
		//	query: (slug) => `/images/image-id-in-album:${slug}`,
		//	providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		//}),

		// ❗ Отримати конкретне зображення
		getImage: builder.query<IImage, string>({
			query: (imageId) => `/images/image-by-id?imageId=${imageId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),
		uploadImages: builder.mutation({
			query: (images = []) => ({
				url: '/images/upload-image',
				method: 'POST',
				body: images,
			}),
			invalidatesTags: ['Images'],
		}),
		deleteImage: builder.mutation({
			query: (imageId) => ({
				url: `/images/delete-image?imageId=${imageId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Images'],
		}),
		addImageDescription: builder.mutation({
			query: (data) => ({
				url: '/images/add-image-description',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Images'],
		}),
	}),
});

export const {
	useGetImagesQuery,
	useUploadImagesMutation,
	useDeleteImageMutation,
	useGetImageQuery,
	//useGetImageIdsQuery,
	useAddImageDescriptionMutation,
} = imagesApi;
