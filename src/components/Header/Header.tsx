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
import LocaleSwitcher from '@/utils/switchLocale';

interface HeaderProps {
	navLinks: INavLink[];
}

const Header: React.FC<HeaderProps> = (navLinks) => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

	//Temp
	const { switchLocale } = LocaleSwitcher();

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
			{/*"Temp"*/}
			<button onClick={() => signIn('google')}>auth</button>
			<button onClick={() => switchLocale('ua')}>ua</button>
			<button onClick={() => switchLocale('en')}>en</button>
		</header>
	);
};

export default Header;
