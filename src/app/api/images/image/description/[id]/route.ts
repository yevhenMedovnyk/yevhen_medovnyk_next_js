import dbConnect from "@/lib/dbConnect";
import Image from "@/models/Image";
import { NextResponse } from "next/server";


export async function PATCH(request: Request, context: { params: { id: string } }) {
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