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
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import useLocaleSwitcher from '@/utils/switchLocale';
import { useLocale } from 'next-intl';

interface HeaderProps {
	navLinks: INavLink[];
}

const Header: React.FC<HeaderProps> = (navLinks) => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

	const { switchLocale } = useLocaleSwitcher();
	const locale = useLocale();

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
			<div className={s.rightSide}>
				<BurgerMenu
					isBurgerMenuOpen={isBurgerMenuOpen}
					handleBurgerLinkClick={handleBurgerLinkClick}
					navLinks={navLinks.navLinks}
				/>
				{/*"Temp"*/}
				<LangSwitcher switchLocale={switchLocale} locale={locale} />
				<button onClick={() => signIn('google')} className={s.signInBtn}>
					Sign In
				</button>
				<CartIcon />

				<BurgerOpenBtn
					isBurgerMenuOpen={isBurgerMenuOpen}
					handleBurgerMenuClick={handleBurgerMenuClick}
				/>
			</div>
		</header>
	);
};

export default Header;
