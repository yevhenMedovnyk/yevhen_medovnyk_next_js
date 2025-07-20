'use client';

import React from 'react';
import s from './Header.module.scss';
import Logo from './Logo/Logo';
import NavLinks from './NavLinks/NavLinks';
import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import CartIcon from './CartIcon/CartIcon';
import { UserAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

	const handleBurgerMenuClick = () => {
		setIsBurgerMenuOpen((prev) => !prev);
	};

	const handleBurgerLinkClick = () => {
		setIsBurgerMenuOpen(false);
	};

	const { signInWithGoogle } = UserAuth();
	


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
			<button onClick={signInWithGoogle}>hjgh</button>
		</header>
	);
};

export default Header;
