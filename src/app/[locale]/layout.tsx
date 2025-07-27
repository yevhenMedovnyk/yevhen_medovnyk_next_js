import type { Metadata } from 'next';
import { Mulish, Montserrat_Alternates, Indie_Flower } from 'next/font/google';
import '../globals.scss';
import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import Footer from '@/components/Footer/Footer';
import MainTitle from '@/components/MainTitle/MainTitle';
import ScrollToTopOnRouteChange from '@/utils/ScrollToTopOnRouteChange';
import { Toaster } from 'sonner';
import Providers from '@/providers';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { INavLink } from '@/types/INavLink';

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

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const messages = await getMessages({ locale });
	const navLinks: INavLink[] = messages.Header.nav;
	const footerNav: INavLink[] = messages.Footer.nav;

	return (
		<html lang={locale}>
			<body
				className={`${mulish.variable} ${montserrat_Alternates.variable} ${indie_Flower.variable}`}
			>
				<NextIntlClientProvider>
					<div className={styles.layoutContainer}>
						<Providers>
							<Header navLinks={navLinks} />
							<MainTitle />
							<main className={styles.main}>{children}</main>
							<Footer navLinks={footerNav} />
						</Providers>
					</div>
					<ScrollToTopOnRouteChange />
					<Toaster duration={2500} />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
