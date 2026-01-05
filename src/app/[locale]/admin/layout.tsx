import React from 'react';
import s from './layout.module.scss';
import AdminNavLinks from '@/components/AdminNavLinks/AdminNavLinks';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions, ISession } from '@/lib/auth';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = (await getServerSession(authOptions)) as ISession;

	if (session?.user?.role !== 'admin') {
		redirect('/');
	}

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
