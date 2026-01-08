import { NextRequest, NextResponse } from 'next/server';
import { getImagesMinimal } from '@/lib/images';

export async function GET(request: NextRequest, context: any) {
	const params = await context.params;
	const slug = params.slug;

	if (!slug) {
		return NextResponse.json({ message: 'slug is required' }, { status: 400 });
	}

	try {
		const images = await getImagesMinimal(slug);

		return NextResponse.json(images);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
