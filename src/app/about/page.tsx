import React from 'react';
import styles from './about.module.scss';


export async function generateMetadata() {
	return {
		title: 'Про мене | Yevhen Medovnyk',
	};
}

const About: React.FC = () => {
	return <div className={styles.container}> Автор красавчик</div>;
};

export default About;
