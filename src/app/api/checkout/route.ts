import { NextRequest, NextResponse } from 'next/server';

const MONO_CHECKOUT_URL = process.env.MONO_CHECKOUT_URL;
const MONO_SECRET = process.env.MONO_CHECKOUT_TOKEN;

if (!MONO_SECRET) throw new Error('MONO_SECRET is not defined!');

export async function POST(req: NextRequest) {
	const body = await req.json();

	const products = body.products.map((product: any) => ({
		name: product.name,
		cnt: product.quantity_in_cart,
		price: product.selectedPrice,
		code_product: product.code_product,
		product_img_src: product.imgs[0].img,
	}));

	const checkoutOrderBody = {
		order_ref: body.order_ref,
		amount: body.amount,
		ccy: 980,
		count: body.count,
		products,
		dlv_method_list: ['np_brnm'],
		payment_method_list: ['card'],
		dlv_pay_merchant: false,
		callback_url: `${process.env.DOMAIN}/api/checkout/callback`,
		return_url: `${process.env.CLIENT_URL}/order-status`,
		hold: false,
		fl_recall: false,
		destination: 'Оплата за фототовари',
	};

	try {
		const res = await fetch(`${MONO_CHECKOUT_URL}order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Token': MONO_SECRET ?? '',
			},
			body: JSON.stringify(checkoutOrderBody),
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.error('Mono checkout error:', errorData);
			return NextResponse.json(
				{ message: 'Mono checkout error', errorData },
				{ status: res.status }
			);
		}

		const data = await res.json();
		console.log('data', data);

		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
