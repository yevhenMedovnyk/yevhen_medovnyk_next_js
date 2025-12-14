import React from 'react';
import s from './Copyright.module.scss';
import { useTranslations } from 'next-intl';

const Copyright: React.FC = () => {
	const t = useTranslations('Footer');

	return (
		<div className={s.container}>
			<p>
				&copy; {t('copyright.author')} <br />
				<span />
				<span>
					{t.rich('copyright.text', {
						br: () => <br />,
					})}
					<br />
				</span>
				<span>{new Date().getFullYear()}</span>
			</p>
		</div>
	);
};

export default Copyright;
