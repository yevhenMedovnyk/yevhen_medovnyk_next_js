import React from 'react';
import s from './layout.module.scss';
import AdminNavLinks from '@/components/AdminNavLinks/AdminNavLinks';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={s.container}>
			<div className={s.sideBar}>
				<AdminNavLinks />
			</div>
			<div className={s.main}>{children}</div>
		</div>
	);
};

export default AdminLayout;
