import React from 'react';
import Link from 'next/link';
import s from './notFound.module.scss';

const ErrorPage = () => {
	return (
		<div className={s.errorPageContainer}>
			<img className={s.errorPageIcon} src={'/404page/pirate_cat_icon.png'} alt="404_image" />
			<h1 className={s.errorPageTitle}>Ууупс, таку сторінку не знайдено!</h1>
			<Link className={s.errorPageLink} href="/">
				Повернутись на головну
			</Link>
		</div>
	);
};

export default ErrorPage;
