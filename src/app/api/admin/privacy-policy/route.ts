import dbConnect from '@/lib/dbConnect';
import PrivacyPolicy from '@/models/PrivacyPolicy';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const body = await req.json();
		if (!body.content) {
			return NextResponse.json({ message: 'Content is required' }, { status: 400 });
		}

		const privacyPolicy = await PrivacyPolicy.findOneAndUpdate({}, body, {
			upsert: true,
			new: true,
		});
		return NextResponse.json(privacyPolicy);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}

export async function GET() {
	await dbConnect();

	try {
		const privacyPolicy = await PrivacyPolicy.findOne({});
		if (!privacyPolicy) {
			return NextResponse.json({ message: 'No privacy policy info found' }, { status: 404 });
		}

		return NextResponse.json(privacyPolicy);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
