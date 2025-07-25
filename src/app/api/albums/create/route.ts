import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { revalidateTag } from 'next/cache';
import slugify from 'slugify';
import dbConnect from '@/lib/dbConnect';
import Image_album from '@/models/ImageAlbum';

// Створення нового альбому
export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ error: 'Only admins can create albums' }, { status: 403 });
	}

	try {
		await dbConnect();

		const body = await request.json();
		const nameEn = body?.name?.en;

		if (!nameEn) {
			return NextResponse.json({ message: 'Album name is required' }, { status: 400 });
		}

		let baseSlug = slugify(nameEn, { lower: true, strict: true });
		let slug = baseSlug;
		let counter = 1;

		// Перевіряємо унікальність slug
		while (await Image_album.findOne({ slug })) {
			slug = `${baseSlug}-${counter++}`;
		}

		const newAlbum = await Image_album.create({ ...body, slug });

		revalidateTag('Albums');

		return NextResponse.json(newAlbum, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ message: error.message || 'Server error' }, { status: 400 });
	}
}
