'use client';

import React, { useState } from 'react';
import s from './AlbumGallery.module.scss';
import Folder from '@/components/Folder/Folder';
import Link from 'next/link';
import { IAlbum } from '@/types/IAlbum';
import { useAppSelector } from '@/hooks/redux';
import { showSuccessToast } from '../UI/showSuccessToast';
import { showErrorToast } from '../UI/showErrorToast';
import { useFetchClient } from '@/hooks/useFetchClient';
import { useAuthStore } from '@/stores/useAuthStore';

interface Props {
	albums: IAlbum[];
}

const AlbumGalleryClient: React.FC<Props> = ({ albums }) => {
	const [galleryAlbums, setGalleryAlbums] = useState<IAlbum[]>(albums);
	const isAdmin = useAuthStore((state) => state.items?.isAdmin);
	const fetchClient = useFetchClient();

	console.log(isAdmin);

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
			showSuccessToast('Альбом видалено');
		} catch (error) {
			console.error('Помилка при видаленні альбому:', error);
			showErrorToast('Помилка при видаленні альбому');
		}
	};

	return (
		<>
			{isAdmin && (
				<Link href="/create-edit-album" className={s.createAlbumBtn}>
					Створити альбом
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
