import { revalidateTag } from 'next/cache';
import dbConnect from '@/lib/dbConnect';
import PrivacyPolicy from '@/models/PrivacyPolicy';
import { NextRequest, NextResponse } from 'next/server';
import { IPrivacyPolicy } from '@/types/IPrivacyPolicy';

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

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const body = await req.json();
		const { locale, content } = body as {
			locale: keyof IPrivacyPolicy['content'];
			content: string;
		};

		console.log(locale, content);

		if (!content || !locale) {
			return NextResponse.json({ message: 'Content and locale are required' }, { status: 400 });
		}

		let privacyPolicyInfo = await PrivacyPolicy.findOne({});

		if (!privacyPolicyInfo) {
			privacyPolicyInfo = new PrivacyPolicy();
		}

		if (locale === 'ua' || locale === 'en') {
			privacyPolicyInfo.content[locale] = content;
		} else {
			return NextResponse.json({ message: 'Invalid locale' }, { status: 400 });
		}

		await privacyPolicyInfo.save();

		revalidateTag('PrivacyPolicy');

		return NextResponse.json(privacyPolicyInfo);
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
