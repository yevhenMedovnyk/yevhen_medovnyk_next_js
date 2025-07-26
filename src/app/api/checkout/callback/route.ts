import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Order from '@/models/Order';
import { updateOrderStatus } from '@/utils/updateOrderStatus';
import dbConnect from '@/lib/dbConnect';

const MONO_CHECKOUT_URL = process.env.MONO_CHECKOUT_URL;
const MONO_SECRET = process.env.MONO_CHECKOUT_TOKEN;

if (!MONO_CHECKOUT_URL || !MONO_SECRET) {
	throw new Error('Mono credentials are not defined!');
}

await dbConnect();

export async function POST(req: NextRequest) {
	const signatureBase64 = req.headers.get('x-sign');
	if (!signatureBase64) {
		return NextResponse.json({ message: 'Missing X-Sign header' }, { status: 400 });
	}

	console.log('signatureBase64', signatureBase64);

	const body = await req.text();
	const signatureBuf = Buffer.from(signatureBase64, 'base64');

	// Отримання публічного ключа від Mono
	const publicKeyResp = await fetch(`${MONO_CHECKOUT_URL}signature/public/key`, {
		headers: { 'X-Token': MONO_SECRET ?? '' },
	});

	if (!publicKeyResp.ok) {
		return NextResponse.json(
			{ message: 'Failed to fetch public key from Mono' },
			{ status: publicKeyResp.status }
		);
	}

	const publicKeyData = await publicKeyResp.json();
	const publicKeyBuf = Buffer.from(publicKeyData.key, 'base64');

	// Перевірка підпису
	const verify = crypto.createVerify('sha256');
	verify.update(body);
	verify.end();

	const isValid = verify.verify(publicKeyBuf, signatureBuf);

	if (!isValid) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
	console.log('Signature is valid');

	const parsedBody = JSON.parse(body);
	const { orderId, generalStatus } = parsedBody;

	console.log('parsedBody', parsedBody);

	// Обробка замовлення
	const existingOrder = await Order.findOne({ orderId });
	if (!existingOrder && generalStatus === 'success') {
		await Order.create(parsedBody);
	} else {
		console.log(
			`${
				generalStatus !== 'success' ? 'Замовлення не успішне' : `Замовлення ${orderId} вже існує!`
			}`
		);
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
