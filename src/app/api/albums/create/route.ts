import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { revalidateTag } from 'next/cache';
import slugify from 'slugify';
import dbConnect from '@/lib/dbConnect';
import Image_album from '@/models/ImageAlbum';
import cloudinary from '@/lib/cloudinary';

interface AlbumBody {
	name: {
		en: string;
		ua?: string;
	};
	category?: string;
	cover_img: string; // base64 string
}

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ error: 'Only admins can create albums' }, { status: 403 });
	}

	try {
		await dbConnect();

		const body: AlbumBody = await request.json();
		const nameEn = body?.name?.en;
		const base64String = body?.cover_img;

		if (!nameEn) {
			return NextResponse.json({ message: 'Album name is required' }, { status: 400 });
		}
		if (!base64String) {
			return NextResponse.json({ message: 'Cover image is required' }, { status: 400 });
		}

		// Формуємо унікальний slug
		let baseSlug = slugify(nameEn, { lower: true, strict: true });
		let slug = baseSlug;
		let counter = 1;

		while (await Image_album.findOne({ slug })) {
			slug = `${baseSlug}-${counter++}`;
		}

		// Завантажуємо обкладинку в Cloudinary
		const uploaded = await cloudinary.uploader.upload(base64String, {
			folder: 'albums_cover',
		});

		// Створюємо новий альбом
		const newAlbum = await Image_album.create({ ...body, cover_img: uploaded.secure_url, slug });

		// Оновлюємо кеш Next.js
		revalidateTag('Albums');

		return NextResponse.json(newAlbum, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
	}
}
