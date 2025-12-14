import type { Metadata } from 'next';
import { Mulish, Indie_Flower } from 'next/font/google';
import './globals.scss';
import { cookies } from 'next/headers';
import { getMessages } from 'next-intl/server';

const mulish = Mulish({
	variable: '--font-mulish',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600'],
});

const indie_Flower = Indie_Flower({
	variable: '--font-indie-flower',
	subsets: ['latin'],
	weight: ['400'],
});

interface Props {
	params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const messages = await getMessages({ locale: params.locale });

	return {
		title: messages.RootLayout.title ?? 'Yevhen Medovnyk | YM FineArt Prints',
		description: messages.RootLayout.description ?? 'Photographer Yevhen Medovnyk',
	};
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE');
	const locale = localeCookie?.value || 'ua';

	return (
		<html lang={locale}>
			<body
				className={`${mulish.variable} ${indie_Flower.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
