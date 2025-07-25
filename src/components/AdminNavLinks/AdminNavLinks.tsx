'use client';

import { signOut, useSession } from 'next-auth/react';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './AdminNavLinks.module.scss';

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
			<button onClick={() => signOut({ callbackUrl: '/' })} className={s.link}>
				Logout
			</button>
		</div>
	);
};

export default AdminNavLinks;
