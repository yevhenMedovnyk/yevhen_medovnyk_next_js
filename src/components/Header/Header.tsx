'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import s from './Header.module.scss';
import Logo from './Logo/Logo';
import NavLinks from './NavLinks/NavLinks';
import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import CartIcon from './CartIcon/CartIcon';
import { INavLink } from '@/types/INavLink';

interface HeaderProps {
	navLinks: INavLink[];
}

const Header: React.FC<HeaderProps> = (navLinks) => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

	const handleBurgerMenuClick = () => {
		setIsBurgerMenuOpen((prev) => !prev);
	};

	const handleBurgerLinkClick = () => {
		setIsBurgerMenuOpen(false);
	};

	return (
		<header className={s.container}>
			<Logo />
			<NavLinks {...navLinks} />
			<CartIcon />
			<BurgerMenu
				isBurgerMenuOpen={isBurgerMenuOpen}
				handleBurgerLinkClick={handleBurgerLinkClick}
				navLinks={navLinks.navLinks}
			/>
			{/*"Temp"*/}
			<button onClick={() => signIn('google')}>auth</button>
			<BurgerOpenBtn
				isBurgerMenuOpen={isBurgerMenuOpen}
				handleBurgerMenuClick={handleBurgerMenuClick}
			/>
		</header>
	);
};

export default Header;
