import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


// Отримати користувача
export async function GET(req: NextRequest) {
	await dbConnect();

	try {
		const { searchParams } = new URL(req.url);
		const uid = searchParams.get('uid');

		if (!uid) {
			return NextResponse.json({ message: 'Missing UID' }, { status: 400 });
		}

		const user = await User.findOne({ uid });

		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error: ' + error.message }, { status: 500 });
	}
}

