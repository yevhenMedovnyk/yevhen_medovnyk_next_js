import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Image_album from '@/models/ImageAlbum';
import Image from '@/models/Image';
import slugify from 'slugify';
import { revalidateTag } from 'next/cache';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import cloudinary from '@/lib/cloudinary';
import { getPublicIdFromUrl } from '@/utils/getPublicIdFromUrl';

interface UpdateAlbumBody {
	albumId: string;
	name: {
		en: string;
		ua: string;
	};
	category?: string;
	cover_img: string; // base64 або URL
	description?: {
		en: string;
		ua: string;
	};
}

function isBase64(str: string) {
	return /^data:image\/[a-z]+;base64,/.test(str);
}

// Оновлення альбому
export async function PUT(req: NextRequest) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ error: 'Only admins can update albums' }, { status: 403 });
	}

	try {
		await dbConnect();

		const body: UpdateAlbumBody = await req.json();
		const { albumId, name, category, cover_img, description } = body;

		if (!albumId) {
			return NextResponse.json({ message: 'albumId is required' }, { status: 400 });
		}

		if (!name?.en) {
			return NextResponse.json({ message: 'Album name (en) is required' }, { status: 400 });
		}

		// Генерація унікального slug
		const baseSlug = slugify(name.en, { lower: true, strict: true });
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

		// Якщо cover_img - base64, завантажуємо нове зображення, інакше залишаємо старе
		if (cover_img && isBase64(cover_img)) {
			const oldPublicId = getPublicIdFromUrl(album.cover_img);
			if (oldPublicId) {
				await cloudinary.uploader.destroy(oldPublicId);
			}

			const uploaded = await cloudinary.uploader.upload(cover_img, {
				folder: 'albums_cover',
			});

			album.cover_img = uploaded.secure_url;
		} else if (cover_img) {
			// Якщо прийшов URL, просто оновлюємо
			album.cover_img = cover_img;
		}

		album.name = name;
		if (category) album.category = category;
		album.slug = slug;

		if (description) {
			album.description = description;
		}

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
