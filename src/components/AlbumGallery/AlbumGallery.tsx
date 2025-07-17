"use client";

import React from 'react';
import s from './AlbumGallery.module.scss';
import Folder from '@/components/Folder/Folder';

import { useDeleteAlbumMutation, useGetAlbumsQuery } from '../../redux/albumsApi';
import { useAppSelector } from '../../hooks/redux';
import { showSuccessToast } from '../UI/showSuccessToast';
import { showErrorToast } from '../UI/showErrorToast';
import Link from 'next/link';

interface IAlbumGalleryProps {
	category: string;
}

const AlbumGallery: React.FC<IAlbumGalleryProps> = ({ category }) => {
	const { data: galleryAlbums = [] } = useGetAlbumsQuery(category, {
		refetchOnMountOrArgChange: true,
	});
	const [deleteAlbum] = useDeleteAlbumMutation();
	const { isAdmin } = useAppSelector((state) => state.auth.user);

	const handleDeleteFolder = async (id: number) => {
		try {
			await deleteAlbum(id).unwrap();
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
				{galleryAlbums.map((folder) => (
					<Folder key={folder._id} {...folder} deleteFolder={handleDeleteFolder} />
				))}
			</div>
		</>
	);
};

export default AlbumGallery;
