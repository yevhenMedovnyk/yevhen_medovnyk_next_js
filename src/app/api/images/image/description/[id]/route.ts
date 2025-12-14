import dbConnect from "@/lib/dbConnect";
import Image from "@/models/Image";
import { NextResponse } from "next/server";
import { authOptions } from '../../../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';



// Оновити опис зображення
export async function PATCH(request: Request, context: { params: { id: string } }) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ error: 'Only admins can update images' }, { status: 403 });
	}
	
	const { id } = context.params;
	const { description } = await request.json();

	try {
		await dbConnect();
		const image = await Image.findById(id);
		if (!image) {
			return NextResponse.json({ message: 'Image not found' }, { status: 404 });
		}
		image.description = description;
		await image.save();
		return NextResponse.json(image, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}