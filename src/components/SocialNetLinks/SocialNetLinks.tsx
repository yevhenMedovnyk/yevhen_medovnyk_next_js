import React from 'react';

import s from './SocialNetLinks.module.scss';

import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';

import Link from 'next/link';

interface ISocialNetLinksProps {
	variant?: string;
}

interface INetworkLinks {
	FaIcon: React.ReactElement;
	ImgIcon: string;
	link: string;
}

const NetworkLinks: INetworkLinks[] = [
	{
		FaIcon: <FaTelegram />,
		ImgIcon: '/social_networks/telegram.svg',
		link: 'https:///t.me/med_yevhen',
	},
	{
		FaIcon: <FaWhatsapp />,
		ImgIcon: '/social_networks/whatsapp.svg',
		link: 'https://wa.me/+380668053222',
	},

	{
		FaIcon: <FaInstagram />,
		ImgIcon: '/social_networks/inst.svg',
		link: 'https://www.instagram.com/med_yevhen/',
	},
];

const SocialNetLinksList: React.FC<ISocialNetLinksProps> = ({ variant }) => {
	return (
		<div style={variant === 'imgIcon' ? { border: 'none' } : {}} className={s.container}>
			{NetworkLinks.map(({ FaIcon, ImgIcon, link }) => (
				<Link className={s.link} key={link} href={link} target="_blank" rel="noopener noreferrer">
					{variant === 'imgIcon' ? <img src={ImgIcon} alt="icon" /> : FaIcon}
				</Link>
			))}
		</div>
	);
};

export default SocialNetLinksList;
