'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './AdminNavLinks.module.scss';
import { UserAuth } from '@/hooks/useAuth';

interface INavLinks {
	title: string;
	to: string;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Client orders',
		to: '/admin',
	},
];

const AdminNavLinks: React.FC = () => {
	const pathname = usePathname();
	const { logout } = UserAuth();

	return (
		<div className={s.container}>
			{navLinksList.map(({ title, to }) => {
				const isActive = pathname === to;

				return (
					<Link key={title} href={to} className={`${s.link} ${isActive ? s.active : ''}`}>
						{title}
					</Link>
				);
			})}
			<button onClick={logout} className={s.link}>
				Logout
			</button>
		</div>
	);
};

export default AdminNavLinks;
