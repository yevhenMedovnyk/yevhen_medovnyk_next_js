'use client';

import React from 'react';
import s from './MainTitle.module.scss';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

interface ITitleList {
	id: number;
	title: string;
	match: string;
}

const MainTitle: React.FC = () => {
	const pathname = usePathname();
	const locale = useLocale();

	const TitleList: ITitleList[] = [
		{ id: 1, title: 'Галерея', match: `/${locale}` },
		{ id: 2, title: 'Проєкти', match: `/${locale}/projects` },
		{ id: 3, title: 'Магазин принтів', match: `/${locale}/store` },
		{ id: 4, title: 'Контакти', match: `/${locale}/contacts` },
		{ id: 5, title: 'Про автора', match: `/${locale}/about` },
		{ id: 6, title: 'Кошик', match: `/${locale}/cart` },
	];

	const currentTitle = TitleList.find(({ match }) => match === pathname);

	return <h1 className={s.container}>{currentTitle?.title}</h1>;
};

export default MainTitle;
