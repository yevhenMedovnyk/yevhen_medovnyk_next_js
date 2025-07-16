"use client";

import React from 'react';
import s from './MainTitle.module.scss';
import { usePathname } from 'next/navigation';

interface ITitleList {
	id: number;
	title: string;
	match: string;
}

const TitleList: ITitleList[] = [
	{ id: 1, title: 'Галерея', match: '/' },
	{ id: 2, title: 'Магазин принтів', match: '/store' },
	{ id: 3, title: 'Контакти', match: '/contacts' },
	{ id: 4, title: 'Про автора', match: '/about' },
	{ id: 5, title: 'Адмінка', match: '/admin' },
	{ id: 6, title: 'Проєкти', match: '/projects' },
	{ id: 7, title: 'Кошик', match: '/cart' },
];

const MainTitle: React.FC = () => {
	const  pathname = usePathname();

	const currentTitle = TitleList.find(({ match }) => match === pathname);

	return <h1 className={s.container}>{currentTitle?.title}</h1>;
};

export default MainTitle;
