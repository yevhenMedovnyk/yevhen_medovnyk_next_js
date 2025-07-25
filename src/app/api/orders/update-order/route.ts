import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { sendMail } from '@/utils/sendMail';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';


// Додати/редагувати ТТН до замовлення
export async function PUT(req: NextRequest) {
	const session = await getServerSession(authOptions);

	if (session?.user?.role !== 'admin') {
		return NextResponse.json({ message: 'Only admins can update orders' }, { status: 403 });
	}
	
	try {
		await dbConnect();
		const body = await req.json();
		const { order_id, tracking_number } = body;

		if (!order_id || !tracking_number) {
			return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
		}

		const order = await Order.findById(order_id);

		if (!order) {
			return NextResponse.json({ message: 'Order not found' }, { status: 404 });
		}
		order.tracking_number = tracking_number;
		await order.save();
		await sendMail({
			email: '',
			emailTo: order.mainClientInfo.email,
			name: order.mainClientInfo.first_name,
			subject: `Замовлення №${order.basket_id} | YM | FineArt Prints`,
			templateName: 'addTrackingNumberMessage',
			context: {
				order,
			},
		});
		return NextResponse.json(order);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
