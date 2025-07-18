'use client';

import React from 'react';
import s from './Header.module.scss';
import Logo from './Logo/Logo';
import NavLinks from './NavLinks/NavLinks';
import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import CartIcon from './CartIcon/CartIcon';
//import dynamic from 'next/dynamic';
//const NavLinks = dynamic(() => import('./NavLinks/NavLinks'), { ssr: false });

const Header: React.FC = () => {
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
			<NavLinks />
			<CartIcon />
			<BurgerMenu
				isBurgerMenuOpen={isBurgerMenuOpen}
				handleBurgerLinkClick={handleBurgerLinkClick}
			/>
			<BurgerOpenBtn
				isBurgerMenuOpen={isBurgerMenuOpen}
				handleBurgerMenuClick={handleBurgerMenuClick}
			/>
		</header>
	);
};

export default Header;
