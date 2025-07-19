import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const MONO_CHECKOUT_URL = process.env.MONO_CHECKOUT_URL;
const MONO_SECRET = process.env.MONO_CHECKOUT_TOKEN;

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const order_ref = searchParams.get('order_ref');

	if (!order_ref) {
		return NextResponse.json({ message: 'Missing order_ref parameter' }, { status: 400 });
	}

	try {
		const orderData = await axios.get(`${MONO_CHECKOUT_URL}order/${order_ref}`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Token': MONO_SECRET,
			},
		});
		return NextResponse.json(orderData.data);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
