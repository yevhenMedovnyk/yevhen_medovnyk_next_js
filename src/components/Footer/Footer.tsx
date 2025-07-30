import React from 'react';
import Copyright from './Copyright/Copyright';
import s from './Footer.module.scss';
import FooterNavLinks from './FooterNavLinks/FooterNavLinks';
import SocialNetLinksList from '../SocialNetLinks/SocialNetLinks';
import { INavLink } from '@/types/INavLink';

interface IFooterProps {
	navLinks: INavLink[];
}

const Footer: React.FC<IFooterProps> = (navLinks) => {
	return (
		<footer className={s.container}>
			<SocialNetLinksList />
			<FooterNavLinks {...navLinks} />
			<Copyright />
		</footer>
	);
};

export default Footer;
