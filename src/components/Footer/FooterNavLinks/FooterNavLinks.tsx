"use client";

import React from 'react';
import s from './FooterNavLinks.module.scss';
import clsx from 'clsx';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IFooterNavLinks {
	title: string;
	to: string;
}

const footerNavLinksList: IFooterNavLinks[] = [
	{
		title: 'Магазин',
		to: '/store',
	},
	{
		title: 'Політика конфіденційності',
		to: '/privacy-policy',
	},
	{
		title: 'Доставка та оплата',
		to: '/delivery-and-payment',
	},
	{
		title: 'Публічна оферта',
		to: '/about',
	},
	{
		title: 'Контакти',
		to: '/contacts',
	},
];

const FooterNavLinks: React.FC = () => {
	const pathname = usePathname();

	const isActive = (link: string) => (pathname === link ? s.active : '');

	return (
		<nav>
			<ul className={s.container}>
				{footerNavLinksList.map(({ title, to }) => (
					<li className={clsx(isActive(to), s.link)} key={to}>
						<Link href={to}>{title}</Link>
					</li>
				))}
				<Link href="/" className={s.logoMini}>
					<img src="/logo-mini.jpg" alt="logo" />
				</Link>
			</ul>
		</nav>
	);
};

export default FooterNavLinks;
