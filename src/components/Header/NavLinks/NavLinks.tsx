import React from 'react';
import { clsx } from 'clsx';
import s from './NavLinks.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

interface INavLinks {
	title: string;
	to: string;
}

interface INavLinksProps {
	class_name?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const navLinksList: INavLinks[] = [
	{
		title: 'Галерея',
		to: '/',
	},
	{
		title: 'Проєкти',
		to: '/projects',
	},
	{
		title: 'Магазин принтів',
		to: '/store',
	},
	{
		title: 'Контакти',
		to: '/contacts',
	},
	{
		title: 'Про автора',
		to: '/about',
	},
];

const NavLinks: React.FC<INavLinksProps> = ({ class_name, onClick }) => {
	const pathname = usePathname();
	const locale = useLocale();

	console.log(locale);
	console.log("pathname", pathname);
	
	

	const isActive = (link: string) => {
		if (link === '/') return pathname === `/${locale}` ? s.active : '';
		return pathname.startsWith(`/${locale}${link}`) ? s.active : '';
	};

	return (
		<nav>
			<ul className={clsx(s.container, class_name && s[class_name])}>
				{navLinksList.map(({ title, to }) => (
					<li className={clsx(isActive(to), s.link, class_name && s[class_name])} key={to}>
						<Link onClick={onClick} href={to}>
							{title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavLinks;
