import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbConnect';
import Image from '@/models/Image';

export async function POST(request: NextRequest) {
	try {
		await dbConnect();

		const formData = await request.formData();

		const albumId = formData.get('album_id') as string;
		const albumSlug = formData.get('album_slug') as string;
		const files = formData.getAll('images') as File[];

		if (!albumId || !albumSlug || files.length === 0) {
			return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
		}

		const uploads = await Promise.all(
			files.map(async (file) => {
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

				const uploaded = await cloudinary.uploader.upload(base64String, {
					folder: 'albums',
				});

				const image = new Image({
					name: file.name,
					img: uploaded.secure_url,
					album_id: albumId,
					album_slug: albumSlug,
					width: uploaded.width,
					height: uploaded.height,
				});

				return await image.save();
			})
		);

		return NextResponse.json({ message: 'Images uploaded', images: uploads }, { status: 201 });
	} catch (error: any) {
		console.error('Upload error:', error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
