import { revalidateTag } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import PublicOffer from '@/models/PublicOffer';
import { NextRequest, NextResponse } from 'next/server';
import { IPublicOffer } from '@/types/IPublicOffer';

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
		const { locale, content } = body as {
			locale: keyof IPublicOffer['content'];
			content: string;
		};

		if (!content || !locale) {
			return NextResponse.json({ message: 'Content and locale are required' }, { status: 400 });
		}

		// Знаходимо документ
		let publicOffer = await PublicOffer.findOne({});

		// Якщо немає, створюємо новий
		if (!publicOffer) {
			publicOffer = new PublicOffer();
		}

		// Типізація для locale
		if (locale === 'ua' || locale === 'en') {
			publicOffer.content[locale] = content;
		} else {
			return NextResponse.json({ message: 'Invalid locale' }, { status: 400 });
		}

		await publicOffer.save();

		revalidateTag('DeliveryAndPayment');

		return NextResponse.json(publicOffer);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
