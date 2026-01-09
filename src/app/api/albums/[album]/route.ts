import { getAlbumBySlug } from '@/lib/albums';
import { NextRequest, NextResponse } from 'next/server';

//Отримати конкретний альбом за назвою
export async function GET(request: NextRequest, context: any) {
	const params = await context.params;
	const slug = params.album;

	try {
		const album = await getAlbumBySlug(slug);

		return NextResponse.json(album);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
