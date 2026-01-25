import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import ImageAlbum from '@/models/ImageAlbum';

export const getAlbumBySlug = (slug: string) =>
	unstable_cache(
		async () => {
			console.log('DB HIT: album', slug);
			await dbConnect();
			return ImageAlbum.findOne({ slug }).lean();
		},
		['album-by-slug', slug],
		{ revalidate: 3600 }
	)();

export const getAlbums = (category: string) =>
	unstable_cache(
		async () => {
			console.log('DB HIT: getAlbums', category);
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
		['albums', category],
		{
			revalidate: 3600,
			tags: ['Albums'],
		}
	)();
