import Image from '@/models/Image';
import dbConnect from './dbConnect';

export const getImagesMinimal = async (slug: string) => {
	try {
		await dbConnect();
		const images = await Image.find({ album_slug: slug }).select('_id width height');
		return images;
	} catch (error: any) {
		return null;
	}
};
