'use client';

import React, { useEffect } from 'react';
import s from './MainTitle.module.scss';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';

interface ITitleList {
	to: string;
	title: string;
}

const MainTitle: React.FC = () => {
	const [title, setTitle] = React.useState('');

	const pathname = usePathname();
	const locale = useLocale();
	const t = useTranslations();

	const TitleList: ITitleList[] = t.raw('Header.nav');

	useEffect(() => {
		const isHome = pathname === `/${locale}`;
		if (isHome) {
			const homeTitle = TitleList.find(({ to }) => to === '/');
			homeTitle && setTitle(homeTitle?.title);
		} else {
			const currentTitle = TitleList.find(({ to }) => `/${locale}${to}` === pathname);
			currentTitle ? setTitle(currentTitle?.title) : setTitle('');
		}
	}, [pathname, locale]);

	return <h1 className={clsx(s.container, !title && s.transparent)}>{title}</h1>;
};

export default MainTitle;
