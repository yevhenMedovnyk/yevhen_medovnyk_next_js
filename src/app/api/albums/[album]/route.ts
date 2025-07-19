import dbConnect from '@/lib/dbConnect';
import ImageAlbum from '@/models/ImageAlbum';
import Image from '@/models/Image';
import { NextRequest, NextResponse } from 'next/server';


//Отримати конкретний альбом за назвою
export async function GET(request: NextRequest, context: any) {
	const params = await context.params;
	const slug = params.album;	

	try {
		await dbConnect();
		const album = await ImageAlbum.findOne({ slug });
		return NextResponse.json(album);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}


