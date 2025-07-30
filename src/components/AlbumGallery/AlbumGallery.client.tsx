'use client';

import React, { useState } from 'react';
import s from './AlbumGallery.module.scss';
import Folder from '@/components/Folder/Folder';
import { IAlbum } from '@/types/IAlbum';
import { showSuccessToast } from '../UI/showSuccessToast';
import { showErrorToast } from '../UI/showErrorToast';
import { useFetchClient } from '@/hooks/useFetchClient';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface Props {
	albums: IAlbum[];
}

const AlbumGalleryClient: React.FC<Props> = ({ albums }) => {
	const [galleryAlbums, setGalleryAlbums] = useState<IAlbum[]>(albums);
	const fetchClient = useFetchClient();
	const { data: session } = useSession();
	const isAdmin = session?.user?.role === 'admin';

	const t = useTranslations('Gallery');

	const handleDeleteFolder = async (slug: string) => {
		try {
			await fetchClient(
				`/api/albums/delete?slug=${slug}`,
				{
					method: 'DELETE',
				},
				true
			);
			setGalleryAlbums((prev) => prev.filter((album) => album.slug !== slug));
			showSuccessToast(t('deleteAlbumSuccess'));
		} catch (error) {
			console.error('Album delete error:', error);
			showErrorToast(t('deleteAlbumError'));
		}
	};

	return (
		<>
			{isAdmin && (
				<Link href="/create-edit-album" className={s.createAlbumBtn}>
					{t('createAlbumButton')}
				</Link>
			)}
			<div className={s.container}>
				{galleryAlbums?.map((folder) => (
					<Folder key={folder._id} folder={folder} deleteFolder={handleDeleteFolder} />
				))}
			</div>
		</>
	);
};

export default AlbumGalleryClient;
