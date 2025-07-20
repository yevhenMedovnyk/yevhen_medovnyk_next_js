import dbConnect from '@/lib/dbConnect';
import ImageAlbum from '@/models/ImageAlbum';
import Image from '@/models/Image';
import { NextRequest, NextResponse } from 'next/server';
import { getPublicIdFromUrl } from '@/utils/getPublicIdFromUrl';
import cloudinary from '@/lib/cloudinary';



//Видалити альбом
export async function DELETE(request: NextRequest) {
	try {
		const slug = request.nextUrl.searchParams.get('slug');

		if (!slug) {
			return NextResponse.json({ message: 'album slug is required' }, { status: 400 });
		}

		await dbConnect();

		// Отримати зображення альбому
		const images = await Image.find({ album_slug: slug });

		// Видалити зображення з Cloudinary
		for (const img of images) {
			const publicId = getPublicIdFromUrl(img.img);
			if (publicId) {
				await cloudinary.uploader.destroy(publicId);
			}
		}

		// Видалити зображення з бази
		await Image.deleteMany({ album_slug: slug });

		// Видалити альбом
		const deletedAlbum = await ImageAlbum.findOneAndDelete({ slug });
		if (!deletedAlbum) {
			return NextResponse.json({ message: 'Album not found' }, { status: 404 });
		}

		return NextResponse.json({ message: 'Album and related images deleted', album: deletedAlbum });
	} catch (error: any) {
		console.error('Delete album error:', error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
