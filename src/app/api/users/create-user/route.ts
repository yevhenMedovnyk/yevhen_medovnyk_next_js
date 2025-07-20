import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

// Створити користувача
export async function POST(req: NextRequest) {
	await dbConnect();
	
	try {
		const body = await req.json();
		const user = await User.create(body);
		return NextResponse.json(user);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

