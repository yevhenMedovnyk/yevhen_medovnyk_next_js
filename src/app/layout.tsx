import type { Metadata } from 'next';
import { Mulish, Montserrat_Alternates, Indie_Flower } from 'next/font/google';
import './globals.scss';
import { cookies } from 'next/headers';

const mulish = Mulish({
	variable: '--font-mulish',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600'],
});

const montserrat_Alternates = Montserrat_Alternates({
	variable: '--font-montserrat-alternates',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600'],
});

const indie_Flower = Indie_Flower({
	variable: '--font-indie-flower',
	subsets: ['latin'],
	weight: ['400'],
});

export const metadata: Metadata = {
	title: 'Yevhen Medovnyk | YM FineArt Prints',
	description: 'Сайт фотографа Медовника Євгена',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE');
	const locale = localeCookie?.value || 'ua';

	return (
		<html lang={locale}>
			<body
				className={`${mulish.variable} ${montserrat_Alternates.variable} ${indie_Flower.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
