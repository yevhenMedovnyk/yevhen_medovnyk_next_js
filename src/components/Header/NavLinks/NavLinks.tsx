import React from 'react';
import { clsx } from 'clsx';
import s from './NavLinks.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { INavLink } from '@/types/INavLink';



interface INavLinksProps {
	navLinks: INavLink[];
	class_name?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavLinks: React.FC<INavLinksProps> = ({ class_name, onClick, navLinks }) => {
	const pathname = usePathname();
	const locale = useLocale();

	const isActive = (link: string) => {
		if (link === '/') return pathname === `/${locale}` ? s.active : '';
		return pathname.startsWith(`/${locale}${link}`) ? s.active : '';
	};

	return (
		<nav>
			<ul className={clsx(s.container, class_name && s[class_name])}>
				{navLinks?.map(({ title, to }) => (
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
