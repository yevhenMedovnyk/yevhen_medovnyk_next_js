import React from 'react';
import s from './Copyright.module.scss';

const Copyright: React.FC = () => {
	return (
		<div className={s.container}>
			<p>
				&copy; Євген Медовник <br />
				<span />
				<span>
					Усі фотографії на цьому сайті підпадають під авторське право, <br />
					та будь-яке їх використання без згоди автора заборонено.
					<br />
				</span>
				<span>{new Date().getFullYear()}</span>
			</p>
		</div>
	);
};

export default Copyright;
