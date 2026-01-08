import dbConnect from '@/lib/dbConnect';
import StoreItem from '@/models/StoreItem';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: any) {
	const params = await context.params;
	const slug = params.product;

	try {
		await dbConnect();
		const product = await StoreItem.findOne({ slug: slug });
		return NextResponse.json(product);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}
