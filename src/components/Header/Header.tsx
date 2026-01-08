'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import s from './Header.module.scss';
import Logo from './Logo/Logo';
import NavLinks from './NavLinks/NavLinks';
import BurgerOpenBtn from './BurgerOpenBtn/BurgerOpenBtn';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import CartIcon from './CartIcon/CartIcon';
import { INavLink } from '@/types/INavLink';
import { useLocale } from 'next-intl';

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

	const { data: session } = useSession();
	const isLoggedIn = session?.user;

	const locale = useLocale();

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
				{isLoggedIn ? (
					<button onClick={() => signOut()} className={s.signInBtn}>
						{locale === 'en' ? 'Sign Out' : 'Вихід'}
					</button>
				) : (
					<button onClick={() => signIn('google')} className={s.signInBtn}>
						{locale === 'en' ? 'Sign In' : 'Увійти'}
					</button>
				)}
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
