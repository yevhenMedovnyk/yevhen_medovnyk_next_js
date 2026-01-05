import { revalidateTag } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import DeliveryAndPayment from '@/models/DeliveryAndPayment';
import { NextRequest, NextResponse } from 'next/server';
import { IDeliveryAndPayment } from '@/types/IDeliveryAndPayment';

export async function GET() {
	await dbConnect();

	try {
		const deliveryInfo = await DeliveryAndPayment.findOne({});
		if (!deliveryInfo) {
			return NextResponse.json({ message: 'No delivery and payment info found' }, { status: 404 });
		}

		return NextResponse.json(deliveryInfo);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const body = await req.json();
		const { locale, content } = body as {
			locale: keyof IDeliveryAndPayment['content'];
			content: string;
		};

		if (!content || !locale) {
			return NextResponse.json({ message: 'Content and locale are required' }, { status: 400 });
		}

		// Знаходимо документ
		let deliveryInfo = await DeliveryAndPayment.findOne({});

		// Якщо немає, створюємо новий
		if (!deliveryInfo) {
			deliveryInfo = new DeliveryAndPayment();
		}

		// Типізація для locale
		if (locale === 'ua' || locale === 'en') {
			deliveryInfo.content[locale] = content;
		} else {
			return NextResponse.json({ message: 'Invalid locale' }, { status: 400 });
		}

		await deliveryInfo.save();

		revalidateTag('DeliveryAndPayment');

		return NextResponse.json(deliveryInfo);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
