'use client';

import React, { useEffect } from 'react';
import s from './AlbumGallery.module.scss';
import Folder from '@/components/Folder/Folder';

import { useAppSelector } from '../../hooks/redux';
import { showSuccessToast } from '../UI/showSuccessToast';
import { showErrorToast } from '../UI/showErrorToast';
import Link from 'next/link';
import { IAlbum } from '@/types/IAlbum';
import { useFetchClient } from '@/hooks/useFetchClient';

interface IAlbumGalleryProps {
	category: string;
}

const AlbumGallery: React.FC<IAlbumGalleryProps> = ({ category }) => {
	const [galleryAlbums, setGalleryAlbums] = React.useState<IAlbum[]>([]);

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				const response = await fetch(`/api/albums?category=${category}`);
				const albums = await response.json();
				setGalleryAlbums(albums);
			} catch (error) {
				console.error('Помилка при отриманні альбомів:', error);
			}
		};
		fetchAlbums();
	}, [category]);

	const { isAdmin } = useAppSelector((state) => state.auth.user);

	const fetchClient = useFetchClient();

	const handleDeleteFolder = async (slug: string) => {
		try {
			await fetchClient(`/api/albums/delete?slug=${slug}`, {
				method: 'DELETE',
			}, true);
			setGalleryAlbums(galleryAlbums.filter((album) => album.slug !== slug));
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
