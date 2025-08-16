'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './AdminNavLinks.module.scss';
import { useLocale } from 'next-intl';

interface INavLinks {
	title: string;
	to: string;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Замовлення клієнтів',
		to: '/admin',
	},
	{
		title: 'Доставка та оплата',
		to: '/admin/delivery-and-payment-admin',
	},
	{
		title: 'Політика конфіденційності',
		to: '/admin/privacy-policy-admin',
	},
	{
		title: 'Публічна оферта',
		to: '/admin/public-offer-admin',
	},
	{
		title: 'Про автора',
		to: '/admin/about-admin',
	},
];

const AdminNavLinks: React.FC = () => {
	const pathname = usePathname();
	const locale = useLocale();

	return (
		<div className={s.container}>
			{navLinksList.map(({ title, to }) => {
				const isActive = `/${locale}${to}` === pathname;

				return (
					<Link key={title} href={to} className={`${s.link} ${isActive ? s.active : ''}`}>
						{title}
					</Link>
				);
			})}
			<button onClick={() => signOut({ callbackUrl: '/' })} className={s.link}>
				Вихід
			</button>
		</div>
	);
};

export default AdminNavLinks;
