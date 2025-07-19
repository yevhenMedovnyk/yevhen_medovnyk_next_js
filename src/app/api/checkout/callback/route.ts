import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';
import Order from '@/models/Order';
import { updateOrderStatus } from '@/utils/updateOrderStatus';
import dbConnect from '@/lib/dbConnect';

const MONO_CHECKOUT_URL = process.env.MONO_CHECKOUT_URL;
const MONO_SECRET = process.env.MONO_CHECKOUT_TOKEN;

await dbConnect();

export async function POST(req: NextRequest) {
	const signatureBase64 = req.headers.get('x-sign');
	if (!signatureBase64)
		return NextResponse.json({ message: 'Missing X-Sign header' }, { status: 400 });

	const body = await req.text();

	const { data: publicKeyResp } = await axios.get(`${MONO_CHECKOUT_URL}signature/public/key`, {
		headers: { 'X-Token': MONO_SECRET },
	});

	const signatureBuf = Buffer.from(signatureBase64, 'base64');
	const publicKeyBuf = Buffer.from(publicKeyResp.key, 'base64');

	const verify = crypto.createVerify('sha256');
	verify.update(body);
	verify.end();

	const isValid = verify.verify(publicKeyBuf, signatureBuf);
	//if (!isValid) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });

	const parsedBody = JSON.parse(body);
	const { orderId, generalStatus } = parsedBody;

	const existingOrder = await Order.findOne({ orderId });
	if (!existingOrder) {
		await Order.create(parsedBody);
	} else {
		console.log(`Замовлення ${orderId} вже існує.`);
	}

	switch (generalStatus) {
		case 'success':
			await updateOrderStatus(orderId, 'success');
			break;
		case 'fail':
			await updateOrderStatus(orderId, 'failed');
			break;
		case 'hold':
			await updateOrderStatus(orderId, 'on_hold');
			break;
		case 'refund':
			await updateOrderStatus(orderId, 'refunded');
			break;
		default:
			await updateOrderStatus(orderId, generalStatus);
			break;
	}

	return NextResponse.json({ message: 'Callback processed' });
}
