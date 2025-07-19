import dbConnect from '@/lib/dbConnect';
import Image from '@/models/Image';
import { NextRequest, NextResponse } from 'next/server';


// Отримати всі зображення в альбомі по назві альбому
export async function GET(request: NextRequest, context: any) {
	const params = await context.params;
	const slug = params.album_slug;

	try {
		await dbConnect();
		const image = await Image.find({ album_slug: slug });
		return NextResponse.json(image);
		
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
