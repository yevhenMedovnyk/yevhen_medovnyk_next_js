'use client';

import React from 'react';
import s from './FooterNavLinks.module.scss';
import clsx from 'clsx';

import { usePathname } from 'next/navigation';
import { INavLink } from '@/types/INavLink';
import Link from 'next/link';

interface IFooterProps {
	navLinks: INavLink[];
}

const FooterNavLinks: React.FC<IFooterProps> = ({ navLinks }) => {
	const pathname = usePathname();

	const isActive = (link: string) => (pathname === link ? s.active : '');

	return (
		<nav>
			<ul className={s.container}>
				{navLinks.map(({ title, to }) => (
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
