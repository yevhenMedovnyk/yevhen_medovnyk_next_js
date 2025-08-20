import { revalidateTag } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import PublicOffer from '@/models/PublicOffer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	await dbConnect();

	try {
		const publicOffer = await PublicOffer.findOne({});
		if (!publicOffer) {
			return NextResponse.json({ message: 'No public offer info found' }, { status: 404 });
		}

		return NextResponse.json(publicOffer);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const body = await req.json();
		if (!body.content) {
			return NextResponse.json({ message: 'Content is required' }, { status: 400 });
		}

		const publicOffer = await PublicOffer.findOneAndUpdate({}, body, {
			upsert: true,
			new: true,
		});

		revalidateTag('PublicOffer');
		return NextResponse.json(publicOffer);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
