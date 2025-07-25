import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Image_album from '@/models/ImageAlbum';
import Image from '@/models/Image';
import slugify from 'slugify';
import { revalidateTag } from 'next/cache';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

// Оновлення альбому
export async function PUT(req: NextRequest) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ error: 'Only admins can update albums' }, { status: 403 });
	}

	try {
		await dbConnect();

		const body = await req.json();
		const { albumId, name, category, cover_img } = body;

		if (!albumId) {
			return NextResponse.json({ message: 'AlbumId is required' }, { status: 400 });
		}

		const nameEn = name?.en;
		if (!nameEn) {
			return NextResponse.json({ message: 'Album name is required' }, { status: 400 });
		}

		let baseSlug = slugify(nameEn, { lower: true, strict: true });
		let slug = baseSlug;
		let counter = 1;

		while (await Image_album.findOne({ slug, _id: { $ne: albumId } })) {
			slug = `${baseSlug}-${counter++}`;
		}

		const album = await Image_album.findById(albumId);
		if (!album) {
			return NextResponse.json({ message: 'Album not found' }, { status: 404 });
		}

		const oldSlug = album.slug;

		album.name = name ?? album.name;
		album.category = category ?? album.category;
		album.cover_img = cover_img ?? album.cover_img;
		album.slug = slug;

		await album.save();

		if (oldSlug !== slug) {
			await Image.updateMany({ album_slug: oldSlug }, { $set: { album_slug: slug } });
		}

		revalidateTag('Albums');
		revalidateTag('Images');

		return NextResponse.json(album.toObject(), { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
