'use client';

import React from 'react';
import s from './Languages.module.scss';
import { useLocale } from 'next-intl';
import LangSwitcher from '@/components/LangSwitcher/LangSwitcher';
import useLocaleSwitcher from '@/utils/switchLocale';

const Languages: React.FC = () => {
	const { switchLocale } = useLocaleSwitcher();
	const locale = useLocale();

	return (
		<div className={s.container}>
			<LangSwitcher switchLocale={switchLocale} locale={locale} />
		</div>
	);
};

export default Languages;
