import dbConnect from '@/lib/dbConnect';
import ImageAlbum from '@/models/ImageAlbum';
import { NextRequest, NextResponse } from 'next/server';


// Отримати всі альбоми за категорією
export async function GET(request: NextRequest) {
	const category = request.nextUrl.searchParams.get('category');

	try {
		await dbConnect();

		const albums = category ? await ImageAlbum.find({ category }) : await ImageAlbum.find();

		return NextResponse.json(albums);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
