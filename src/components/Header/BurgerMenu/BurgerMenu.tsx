'use client';

import React, { useEffect } from 'react';
import s from './BurgerMenu.module.scss';
import NavLinks from '../NavLinks/NavLinks';
import Logo from '../Logo/Logo';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import { INavLink } from '@/types/INavLink';

interface IBurgerMenuProps {
	isBurgerMenuOpen: boolean;
	handleBurgerLinkClick: () => void;
	navLinks: INavLink[];
}

const BurgerMenu: React.FC<IBurgerMenuProps> = ({
	isBurgerMenuOpen = false,
	handleBurgerLinkClick,
	navLinks,
}) => {
	

	

	useEffect(() => {
		if (isBurgerMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isBurgerMenuOpen]);

	return (
		<nav className={clsx(s.BurgerMenuContainer, isBurgerMenuOpen && s.open)}>
			<Logo class_name="burgerMenu" onClick={handleBurgerLinkClick} />
			<NavLinks navLinks={navLinks} class_name="burgerMenu" onClick={handleBurgerLinkClick} />
			<Link onClick={handleBurgerLinkClick} href="/" className={s.logoMini}>
				<img src="/logo-mini-white.webp" alt="logo" />
			</Link>
		</nav>
	);
};

export default BurgerMenu;
