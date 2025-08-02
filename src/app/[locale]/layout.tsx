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
import Cookies from 'js-cookie';

export default async function LocaleLayout({
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

	Cookies.set('NEXT_LOCALE', locale);

	const messages = await getMessages({ locale });
	const navLinks: INavLink[] = messages.Header.nav;
	const footerNav: INavLink[] = messages.Footer.nav;

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
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
	);
}
