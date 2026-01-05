'use client';

import React from 'react';
import s from './Folder.module.scss';
import { BiEdit } from 'react-icons/bi';
import { MdFolderDelete } from 'react-icons/md';

import { IAlbum } from '../../types/IAlbum';

import { ClipLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

type IFolderProps = {
	deleteFolder: (slug: string) => void;
	folder: IAlbum;
};

const Folder: React.FC<IFolderProps> = ({ folder, deleteFolder }) => {
	const { cover_img, name, category, slug } = folder;
	const { data: session } = useSession();
	const isAdmin = session?.user?.role === 'admin';

	const t = useTranslations('Gallery.folder');
	const locale = useLocale();
	const currentLocale = locale as keyof IAlbum['name'];

	if (!slug)
		return (
			<div className="spinnerWrapper">
				<ClipLoader color="#b0bab8" size={50} />
			</div>
		);

	return (
		<div className={s.folder}>
			{isAdmin && (
				<div className={s.btns}>
					<Link href={`/create-edit-album/${slug}`} className={s.editBtn}>
						<BiEdit /> <span>{t('edit')}</span>
					</Link>
					<button
						onClick={
							slug
								? () => {
										deleteFolder(slug);
									}
								: () => {
										console.log('no id');
									}
						}
						className={s.deleteBtn}
					>
						<MdFolderDelete />
						<span>{t('delete')}</span>
					</button>
				</div>
			)}
			<div className={s.container}>
				<Link href={`/${category}/${slug}`} className={s.imgLink}>
					<img src={cover_img} alt="album_cover" />
				</Link>
				<Link href={`${category}/${slug}`} className={s.title}>
					<span className={s.albumName}>{name[currentLocale]}</span>
				</Link>
			</div>
		</div>
	);
};

export default Folder;
