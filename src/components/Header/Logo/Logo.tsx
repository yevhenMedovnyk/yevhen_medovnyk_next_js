import React from 'react';
import s from './Logo.module.scss';

import clsx from 'clsx';
import Link from 'next/link';

interface ILogoProps {
	class_name?: string;
	onClick?: () => void;
}

const Logo: React.FC<ILogoProps> = ({ class_name, onClick }) => {
	return (
		<Link onClick={onClick} href="/" className={clsx(s.container, class_name && s[class_name])}>
			Yevhen Medovnyk
		</Link>
	);
};

export default Logo;
