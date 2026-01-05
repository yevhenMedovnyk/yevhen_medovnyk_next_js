import dbConnect from '@/lib/dbConnect';
import StoreItem from '@/models/StoreItem';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		await dbConnect();
		const products = await StoreItem.find();
		return NextResponse.json(products);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
