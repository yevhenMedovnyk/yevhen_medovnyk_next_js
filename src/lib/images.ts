import Image from '@/models/Image';
import dbConnect from './dbConnect';
import { unstable_cache } from 'next/cache';

export const getImagesMinimal = unstable_cache(
	async (slug: string) => {
		try {
			await dbConnect();
			const images = await Image.find({ album_slug: slug }).select('_id width height').lean();
			return images;
		} catch (error: any) {
			console.error(error);
			return null;
		}
	},
	['images-minimal'],
	{
		revalidate: 3600,
		tags: ['Images'],
	}
);
