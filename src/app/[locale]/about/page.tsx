import React from 'react';
import styles from './about.module.scss';
import { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const messages = await getMessages({ locale: locale });

	return {
		title: messages.About.meta.title ?? 'About | YM FineArt Prints',
		description: messages.About.meta.description ?? 'About | YM FineArt Prints',
	};
}

const About: React.FC = () => {
	return <div className={styles.container}> Автор красавчик</div>;
};

export default About;
