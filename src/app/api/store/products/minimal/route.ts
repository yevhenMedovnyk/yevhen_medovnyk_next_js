import dbConnect from '@/lib/dbConnect';
import StoreItem from '@/models/StoreItem';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	
	try {
		await dbConnect();
		const products = await StoreItem.find({}).select('name slug price imgs');
		return NextResponse.json(products);

	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
