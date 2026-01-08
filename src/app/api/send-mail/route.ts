import { sendMail } from '@/utils/sendMail';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const result = await sendMail(body);

		if (!result.success) {
			throw new Error(result.error || 'Failed to send email');
		}

		return NextResponse.json({
			message: 'Message sent successfully!',
			messageId: result.messageId,
		});
	} catch (error: any) {
		console.error('❌ POST /api/contact error:', error.message);
		return NextResponse.json({ message: error.message || 'Something went wrong' }, { status: 500 });
	}
}
