import dbConnect from '@/lib/dbConnect';
import DeliveryAndPayment from '@/models/DeliveryAndPayment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const body = await req.json();
		if (!body.content) {
			return NextResponse.json({ message: 'Content is required' }, { status: 400 });
		}

		const delivery = await DeliveryAndPayment.findOneAndUpdate({}, body, {
			upsert: true,
			new: true,
		});
		return NextResponse.json(delivery);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

export async function GET() {
	await dbConnect();

	try {
		const delivery = await DeliveryAndPayment.findOne({});
		if (!delivery) {
			return NextResponse.json({ message: 'No delivery and payment info found' }, { status: 404 });
		}

		return NextResponse.json(delivery);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
