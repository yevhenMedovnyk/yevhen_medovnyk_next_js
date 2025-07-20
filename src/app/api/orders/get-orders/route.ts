import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { NextRequest, NextResponse } from 'next/server';



// Отримати всі замовлення з БД
export async function GET(req: NextRequest) {
	try {
		await dbConnect();
		const orders = await Order.find();
		return NextResponse.json(orders);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
