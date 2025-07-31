import React from 'react';
import s from './LangSwitcher.module.scss';
import clsx from 'clsx';

interface ILangSwitcherProps {
	switchLocale: (newLocale: string) => void;
	locale: string;
}

const LangSwitcher: React.FC<ILangSwitcherProps> = ({ switchLocale, locale: currentLocale }) => {
	const icons = [
		{
			src: '/lang/ua.png',
			alt: 'ua-flag',
			locale: 'ua',
		},
		{
			src: '/lang/usa.png',
			alt: 'en',
			locale: 'en',
		},
	];

	return (
		<div className={s.langSwitcher}>
			{icons.map(({ src, alt, locale }) => (
				<button
					key={locale}
					className={clsx(s.langBtn, locale === currentLocale ? s.active : '')}
					onClick={() => switchLocale(locale)}
				>
					<img src={src} alt={alt} />
				</button>
			))}
		</div>
	);
};

export default LangSwitcher;
