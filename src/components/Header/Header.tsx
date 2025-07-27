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
			/>
			<BurgerOpenBtn
				isBurgerMenuOpen={isBurgerMenuOpen}
				handleBurgerMenuClick={handleBurgerMenuClick}
			/>
			<button onClick={() => signIn('google')}>hjgh</button>
		</header>
	);
};

export default Header;
