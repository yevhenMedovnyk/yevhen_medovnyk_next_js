import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Image from '@/models/Image';

export async function GET(request: NextRequest, context: any) {
	const params = await context.params;
	const slug = params.slug;

	if (!slug) {
		return NextResponse.json({ message: 'slug is required' }, { status: 400 });
	}

	try {
		await dbConnect();

		const images = await Image.find({ album_slug: slug }).select('_id width height');

		return NextResponse.json(images);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
