import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import ImageAlbum from '@/models/ImageAlbum';

export const getAlbumBySlug = unstable_cache(
	async (slug: string) => {
		await dbConnect();
		return ImageAlbum.findOne({ slug }).lean();
	},
	['album-by-slug'],
	{
		revalidate: 3600,
		tags: ['Albums'],
	}
);

export const getAlbums = unstable_cache(
	async (category: string) => {
		await dbConnect();
		const albums = await ImageAlbum.find({ category }).lean();
		const filteredAlbums = albums.map((album) => {
			return {
				...album,
				_id: album._id.toString(),
			};
		});

		return filteredAlbums;
	},
	['albums'],
	{
		revalidate: 3600,
		tags: ['Albums'],
	}
);
