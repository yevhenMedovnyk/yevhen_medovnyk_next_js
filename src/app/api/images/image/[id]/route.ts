import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Image from '@/models/Image';
import cloudinary from '@/lib/cloudinary';
import { getPublicIdFromUrl } from '@/utils/getPublicIdFromUrl';
import mongoose from 'mongoose';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
	const params = await context.params;
	const id = params?.id;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
	}

	try {
		await dbConnect();
		const image = await Image.findById(id);
		if (!image) {
			return NextResponse.json({ message: 'Image not found' }, { status: 404 });
		}
		return NextResponse.json(image.toObject());
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ error: 'Only admins can delete images' }, { status: 403 });
	}

	const params = await context.params;
	const id = params?.id;

	try {
		await dbConnect();
		const image = await Image.findById(id);
		if (!image) {
			return NextResponse.json({ message: 'Image not found' }, { status: 404 });
		}

		const publicId = getPublicIdFromUrl(image.img);
		if (!publicId) {
			return NextResponse.json({ message: 'Public ID not found' }, { status: 404 });
		}

		await cloudinary.uploader.destroy(publicId);
		await Image.findByIdAndDelete(id);

		revalidateTag('Images');


		return NextResponse.json(
			{ message: 'Image deleted from MongoDB and Cloudinary' },
			{ status: 200 }
		);

	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
